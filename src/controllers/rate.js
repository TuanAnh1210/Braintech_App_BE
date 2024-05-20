import Rate from '../models/rate';

export const getAllRate = async (req, res) => {
    try {
        const rates = await Rate.find().populate([
            {
                path: 'user_id',
                select: ['full_name', 'email', 'avatar'],
            },
            {
                path: 'course_id',
                select: ['name', 'thumb'],
            },
        ]);

        res.status(200).send({
            message: 'Lấy thành công',
            rates,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};
export const getAllRateById = async (req, res) => {
    try {
        const id = req.params.id;
        const rates = await Rate.find({ course_id: id }).populate([
            {
                path: 'user_id',
                select: ['full_name', 'email', 'avatar'],
            },
            {
                path: 'course_id',
                select: ['name', 'thumb'],
            },
        ]);

        res.status(200).send({
            message: 'Lấy thành công',
            rates,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};
export const rateCourse = async (req, res) => {
    try {
        const { content, rating, course_id } = req.body;
        const user_id = req.userId;
        const rate = await Rate.create({
            content: content,
            rating: rating,
            course_id: course_id,
            user_id: user_id,
        });
        res.status(200).send({
            message: 'Đánh giá thành công',
            rate,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message,
        });
    }
};
