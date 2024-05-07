import moment from 'moment';
import querystring from 'qs';
import crypto from 'crypto';

import PaymentHistory from '../models/paymentHistory.js';
import Courses from '../models/courses.js';

import 'dotenv/config';
import { nextTimestamp, sortObject } from '../helper/utils.js';
import { _countLessonInChapters } from './finishLesson.js';
export const getAllPayment = async (req, res) => {
    const start = req.query?.fromDate;
    const end = req.query?.toDate;

    // Get payment by date (no date => all payment)
    const pipeline = [
        ...(start
            ? [
                  {
                      $match: {
                          createdAt: {
                              $gte: new Date(+start),
                              $lte: end ? new Date(+end) : new Date(),
                          },
                      },
                  },
              ]
            : []),
        {
            $lookup: {
                from: 'courses',
                localField: 'course_id',
                foreignField: '_id',
                as: 'course_info',
            },
        },
        {
            $unwind: {
                path: '$course_info',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user_info',
            },
        },
        {
            $unwind: {
                path: '$user_info',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'course_info.cate_id',
                foreignField: '_id',
                as: 'category_info',
            },
        },
        {
            $unwind: {
                path: '$category_info',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                _id: 0,
                createdAt: 1,

                transaction_id: 1,
                transaction_content: 1,
                payment_url: 1,
                amount: 1,
                status: 1,
                status_message: 1,

                course_info: '$course_info',
                category_info: '$category_info',
                user_info: '$user_info',
            },
        },
    ];

    try {
        const data = await PaymentHistory.aggregate(pipeline).exec();
        let appendData = null;

        if (data?.length) {
            appendData = await Promise.all(
                data.map(async (payment) => {
                    if (payment.course_info) {
                        const totalLessons = await _countLessonInChapters(payment.course_info?.chapters);

                        return { ...payment, course_info: { ...payment.course_info, totalLessons } };
                    }
                }),
            );
        }

        const datas = appendData.flat();

        res.send({
            message: 'Get payment successfully',
            // data: appendData || data,
            data: datas,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

export const getPaymentByID = async (req, res) => {
    const transactionId = req.params.transactionId;

    const pipeline = [
        {
            $match: { transaction_id: transactionId },
        },
        {
            $lookup: {
                from: 'courses',
                localField: 'course_id',
                foreignField: '_id',
                as: 'course_info',
            },
        },
        {
            $unwind: {
                path: '$course_info',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user_info',
            },
        },
        {
            $unwind: {
                path: '$user_info',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'course_info.cate_id',
                foreignField: '_id',
                as: 'category_info',
            },
        },
        {
            $unwind: {
                path: '$category_info',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                _id: 0,
                createdAt: 1,

                transaction_id: 1,
                transaction_content: 1,
                payment_url: 1,
                amount: 1,
                status: 1,
                status_message: 1,

                course_info: '$course_info',
                category_info: '$category_info',
                user_info: '$user_info',
            },
        },
        { $limit: 1 },
    ];

    try {
        const data = await PaymentHistory.aggregate(pipeline);
        if (!data) {
            res.status(404).send({
                message: 'Payment not found',
            });
        }
        res.send({
            message: 'Get data successfully',
            data: data[0],
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
};

export const createPaymentUrl = async (req, res) => {
    try {
        const userId = req.userId;
        const { courseId } = req.body;

        if (!courseId) {
            res.status(404).json({
                message: 'Please provide a valid courseId.',
            });
            return null;
        }

        const course = await Courses.findOne({ _id: courseId }).select(['_id', 'price']);

        if (!course) {
            res.status(404).json({
                message: 'The course does not exist or has been hidden.',
            });
            return null;
        }

        const transaction = await PaymentHistory.findOne({ user_id: userId })
            .select(['status', 'course_id', 'payment_url', 'timestamp_expired'])
            .sort({ timestamp_expired: -1 });

        if (
            transaction &&
            transaction.status === 'PENDING' &&
            transaction.timestamp_expired - new Date().getTime() > 1000
        ) {
            res.status(200).send({
                message: 'Transaction Exist!',
                url: transaction.payment_url,
            });
            return null;
        }

        if (transaction && transaction.status === 'SUCCESS' && transaction.course_id == courseId) {
            res.status(400).send({
                message: 'You have purchased this course!',
            });
            return null;
        }

        process.env.TZ = 'Asia/Ho_Chi_Minh';

        const date = new Date();
        const createDate = moment(date).format('YYYYMMDDHHmmss');

        const ipAddr =
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        const tmnCode = process.env.TMN_CODE_VNPAY;
        const secretKey = process.env.SECRET_KEY_VNPAY;
        let vnpUrl = process.env.URL_VNPAY;
        const returnUrl = process.env.RETURN_URL;
        const orderId = moment(date).format('DDHHmmss');
        const amount = course.price;
        const bankCode = 'VNBANK';

        const locale = req.body.language || 'vn';

        const currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        vnp_Params['vnp_BankCode'] = bankCode;

        vnp_Params = sortObject(vnp_Params);

        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        await PaymentHistory.create({
            transaction_id: orderId,
            amount: amount,
            user_id: userId,
            course_id: courseId,
            payment_url: vnpUrl,
            transaction_content: '',
            timestamp_expired: nextTimestamp(15),
            status: 'PENDING',
        });

        res.status(200).send({
            message: 'Create PaymentUrl Success!',
            url: vnpUrl,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};

export const callbackPayment = async (req, res) => {
    try {
        const {
            vnp_TxnRef: transactionId,
            vnp_OrderInfo: transactionContent,
            vnp_TransactionStatus: status,
        } = req.query;

        let vnp_Params = req.query;

        const secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);

        const secretKey = process.env.SECRET_KEY_VNPAY;

        const signData = querystring.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        if (secureHash !== signed) {
            res.status(400).send({
                message: 'Invalid transaction or processing error.',
            });

            return null;
        }

        const transaction = await PaymentHistory.findOne({
            transaction_id: transactionId,
            status: 'PENDING',
        });

        if (!transaction) {
            res.status(400).send({
                message: 'The transaction already exists or has been processed.',
            });
            return null;
        }

        const transactionStatus = {
            '00': 'Giao dịch thanh toán thành công',
            '01': 'Giao dịch chưa hoàn tất',
            '02': 'Giao dịch bị lỗi',
            '04': 'Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)',
            '05': 'VNPAY đang xử lý giao dịch này (GD hoàn tiền)',
            '06': 'VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)',
            '07': '	Giao dịch bị nghi ngờ gian lận',
            '09': 'GD Hoàn trả bị từ chối',
        };

        const statusPayment = {
            '01': 'SUCCESS',
            '02': 'CANCEL',
        };

        await PaymentHistory.updateOne(
            { transaction_id: transactionId },
            {
                transaction_content: transactionContent,
                status: status === '02' ? 'CANCEL' : 'SUCCESS',
                status_message: transactionStatus[status] || null,
            },
        );

        res.redirect('http://localhost:3000/detail/' + transaction.course_id);
    } catch (error) {
        console.log('error: Callback_VNPAY', error);
        res.status(500).json({
            message: error,
        });
    }
};
