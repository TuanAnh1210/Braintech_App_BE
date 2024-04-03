import Quizzs from '../models/quizzs';

export const createQuizz = async (req, res) => {
    try {
        const body = req.body;

        const course = await Quizzs.create(body);

        res.status(200).send({
            message: 'Create Course Success!',
            data: course,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};
