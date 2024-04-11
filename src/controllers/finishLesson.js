import finishLesson from "../models/finishLesson";

export const getAll = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await finishLesson.find({
      user_id: userId,
    });
    res.send({
      message: "Get data successfully",
      data,
    });
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};
export const addLessonToFinishLesson = async (req, res) => {
  try {
    const { lesson_id, user_id, course_id } = req.body;
    const exist = await finishLesson.findOne({
      lesson_id: lesson_id,
      user_id: user_id,
      course_id: course_id,
    });
    if (!exist) {
      const data = new finishLesson({
        lesson_id: lesson_id,
        user_id: user_id,
        course_id: course_id,
      });
      await data.save();
      res.status(200).send({
        message: "Lesson đã hoàn thành",
      });
    } else {
      res.status(400).send({
        message: "Lesson đã tồn tại",
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
    const course_id = req.params.course_id;
    const count = await finishLesson.count({ course_id: course_id });
    res.send({
      message: "Counted successfully",
      count,
    });
  } catch (err) {
    res.status(500).send({
      message: err,
    });
  }
};