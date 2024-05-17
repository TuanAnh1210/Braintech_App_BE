import Vouchers from '../models/voucher';
import User from '../models/users';

export const createVoucher = async (req, res) => {
    try {
        const body = req.body;

        const voucherExist = await Vouchers.findOne({ codeName: body.codeName });

        if (voucherExist) {
            res.status(400).json({ msg: 'Voucher already exists' });
            return;
        }
        const voucher = await Vouchers.create(body);
        res.status(200).send({
            message: 'Create Vouchers Success!',
            data: voucher,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};

export const getAll = async (req, res) => {
    try {
        let appendData = null;
        const vouchers = await Vouchers.find();

        res.send({
            message: 'Get all vouchers successfully',
            vouchers: appendData || vouchers,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const getVouchersByUserId = async (req, res) => {
    try {

        const userId = req.userId;
        const vouchers = await User.find({ _id: userId }).populate([
            {
                path: 'vouchers',
                select: ['codeName', 'quantity', 'discountAmount', 'maxDiscountAmount'],
            },
        ]);

        res.status(200).send({
            message: 'Get Success!',
            data: vouchers,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};
export const getVoucherById = async (req, res) => {
    try {
        const voucherId = req.params.id;

        const voucher = await Vouchers.findById({
            _id: voucherId,
        });

        res.status(200).send({
            message: 'Get Success!',
            data: voucher,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};

export const deleteVoucher = async (req, res) => {
    try {
        // await Casts.updateMany({ films: req.params.id }, { $pull: { films: req.params.id } });
        const deletedMovie = await Vouchers.findByIdAndDelete(req.params.id);

        if (deletedMovie) {
            res.status(200).json({ msg: 'Deleted successfully' });
        } else {
            res.status(400).json({ msg: 'Movie not exists' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};

export const deleteVoucher1 = async (req, res) => {
    try {
        // Update User thêm trường voucher[] để chưa vouchers
        await User.updateMany({ vouchers: req.params.id }, { $pull: { vouchers: req.params.id } });
        const deletedMovie = await Vouchers.findByIdAndDelete(req.params.id);

        if (deletedMovie) {
            res.status(200).json({ msg: 'Deleted successfully' });
        } else {
            res.status(400).json({ msg: 'Movie not exists' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};

export const updateVoucher = async (req, res) => {
    try {
        const voucherId = req.params.id;
        const payload = req.body;

        const newVoucher = await Vouchers.findByIdAndUpdate(voucherId, payload);

        res.status(200).send({
            message: 'Update Voucher Success!',
            data: newVoucher,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};
