import Chapters from '../models/chapters';

export const getAll = async (req, res) => {
    try {
        const chapters = await Chapters.find();
        res.send({
            message: 'Get all chapters successfully',
            chapters,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};
