import Chapters from '../models/chapters';
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
export const getOne = async (req,res) => {
  try{
    
  }catch (error) {
    res.status(500).send({
      message: error,
    });
  }
}