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

export const getQuizzsByLessonId = async (req, res) => {
    try {
        const lessonId = req.params.lessonId;

        const quizzs = await Quizzs.find({
            lesson_id: lessonId,
        });

        res.status(200).send({
            message: 'Get Success!',
            data: quizzs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
}