import Lessons from '../models/lessons';

export const getAll = async (req, res) => {
    try {
        const lessons = await Lessons.find();

        res.send({
            message: 'Get all courses successfully',
            lessons,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};
