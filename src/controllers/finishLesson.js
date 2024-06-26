import finishLesson from '../models/finishLesson.js';
import Chapters from '../models/chapters.js';

export const getAll = async (req, res) => {
    try {
        const userId = req.userId;

        const data = await finishLesson.find({
            user_id: userId,
        });
        res.send({
            message: 'Get data successfully',
            data,
        });
    } catch (err) {
        res.status(500).send({
            message: err,
        });
    }
};

export const getFinishLessonByCourseId = async (req, res) => {
    try {
        const userId = req.userId;
        const courseId = req.params.courseId;

        const chapters = await Chapters.find({ courses_id: courseId, isPublic: true }).populate({
            path: 'lessons',
        });

        const data = await finishLesson
            .findOne({
                user_id: userId,
                course_id: courseId,
            })
            .sort({ _id: -1 });

        res.send({
            message: 'Get data successfully',
            data,
            chapters,
        });
    } catch (err) {
        res.status(500).send({
            message: err,
        });
    }
};

export const addLessonToFinishLesson = async (req, res) => {
    try {
        const userId = req.userId;
        const { lesson_id, course_id } = req.body;

        const exist = await finishLesson.findOne({
            lesson_id: lesson_id,
            user_id: userId,
            course_id: course_id,
        });

        if (!exist) {
            const data = new finishLesson({
                lesson_id: lesson_id,
                user_id: userId,
                course_id: course_id,
            });

            await data.save();

            res.status(200).send({
                message: 'Lesson đã hoàn thành',
            });
        } else {
            res.status(400).send({
                message: 'Lesson đã tồn tại',
            });
        }
    } catch (err) {
        res.status(500).send({
            message: err,
        });
    }
};

export const countLessonFinish = async (req, res) => {
    try {
        const userId = req.userId;
        const course_id = req.params.course_id;
        const count = await finishLesson.count({ course_id: course_id, user_id: userId });
        res.send({
            message: 'Counted successfully',
            count,
        });
    } catch (err) {
        res.status(500).send({
            message: err,
        });
    }
};

//? SERVICES
export const _countLessonInChapters = async (chapters) => {
    const pipeline = [
        {
            $match: {
                _id: {
                    $in: chapters,
                },
            },
        },
        {
            $project: {
                lessons: {
                    $size: '$lessons',
                },
            },
        },
    ];

    const lessons = (await Chapters.aggregate(pipeline).exec()) || [];

    return lessons.reduce((a, b) => a + b.lessons, 0);
};
