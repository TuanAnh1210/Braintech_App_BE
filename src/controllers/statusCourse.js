import statusCourse from "../models/statusCourse";

export const getAll = async (req, res) => {
  try {
    const data = await statusCourse.find();
    res.send({
      message: "Get data successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};
export const addCourseToSttCourse = async (req, res) => {
  console.log(req.body);

  try {
    const { course_id, user_id } = req.body;

    const exist = await statusCourse.findOne({ course_id: course_id });
    if (!exist) {
      const data = new statusCourse({
        course_id: course_id,
        user_id: user_id,
      });

      await data.save();

      res.status(200).send({
        message: "Bắt đầu học",
      });
    } else {
      res.status(400).send({
        message: "Khóa học đã tồn tại trong danh sách",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
