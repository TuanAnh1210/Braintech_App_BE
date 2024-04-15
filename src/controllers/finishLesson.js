import finishLesson from "../models/finishLesson";

export const getAll = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await finishLesson.find({ user_id: id });
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
    const { lesson_id, user_id } = req.body;
    const exist = await finishLesson.findOne({
      lesson_id: lesson_id,
      user_id: user_id,
    });
    if (!exist) {
      const data = new finishLesson({
        lesson_id: lesson_id,
        user_id: user_id,
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
