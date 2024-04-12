import Chapters from '../models/chapters';
import Courses from '../models/courses';

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

export const getChapterById = async (req, res) => {
    try {
        const chapterId = req.params.chapterId;

        const selectedChapter = await Chapters.findById(chapterId).populate({
            path: 'lessons',
            //   select: ['name', 'isPublic', 'isFree', 'lessons'],
        });

        res.send({
            message: 'Get Chapter Successfully',
            data: selectedChapter,
        });
    } catch (error) {
        res.status(500).send({
            message: error,
        });
    }
};

export const createChapter = async (req, res) => {
    try {
        const body = req.body;

        const chapter = await Chapters.create(body);

        await Courses.findByIdAndUpdate(body.courses_id, {
            $addToSet: {
                chapters: chapter._id,
            },
        });

        res.status(200).send({
            message: 'Create Chapter Success!',
            data: chapter,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};

export const updateChapter = async (req, res) => {
    try {
        const chapterId = req.params.chapterId;
        const payload = req.body;

        const chapter = await Chapters.findByIdAndUpdate(chapterId, payload);

        res.status(200).send({
            message: 'Update Chapter Success!',
            data: chapter,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
};
