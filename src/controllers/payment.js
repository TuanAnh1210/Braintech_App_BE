import paymentHistory from '../models/paymentHistory';

export const getAllByUserId = async (req, res) => {
    try {
        const data = await paymentHistory.find().populate([
            {
                path: 'course_id',
                select: ['name', 'thumb'],
            },
        ]);
        res.status(200).json({
            message: 'Get all payment history successfully',
            data,
        });
    } catch (e) {
        res.status(500).json({
            message: `Error: ${e.message}`,
        });
    }
};
