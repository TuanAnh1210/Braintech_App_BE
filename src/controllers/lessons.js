import Chapters from '../models/chapters.js';
import Lessons from '../models/lessons.js';

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

export const createLesson = async (req, res) => {
    try {
        const { chapter_id, ...body } = req.body;

        const lesson = await Lessons.create({ chapter_id, ...body });

        await Chapters.findByIdAndUpdate(chapter_id, {
            $addToSet: {
                lessons: lesson._id,
            },
        });

        res.status(200).send({
            message: 'Create Lesson Success!',
            data: body,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};

export const updateLessonById = async (req, res) => {
    try {
        const lessonId = req.params.lessonId;

        const body = req.body;

        await Lessons.updateOne({ _id: lessonId }, body);

        res.status(200).send({
            message: 'Update Lesson Success!',
            data: body,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};
export const getLessonById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await Lessons.findOne({ _id: id, isPublic: true });

        if (result) {
            return res.status(200).send({
                message: 'Get Lesson Success!',
                data: result,
            });
        }

        res.status(404).send({
            message: 'Lesson not found',
            data: null,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};
export const getNextLesson = async (req, res) => {
    try {
        const { id } = req.params;
        const nextLesson = await Lessons.find({ _id: { $lt: id } })
            .sort({ _id: -1 })
            .limit(1);
        if (nextLesson.length > 0) {
            res.status(200).send({
                message: 'Get next lesson successfully',
                nextLesson,
            });
        } else {
            res.status(404).send({
                message: 'Get next lesson failed',
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};
