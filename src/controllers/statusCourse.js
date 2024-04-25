import statusCourse from "../models/statusCourse";
import courses from "../models/courses";
export const getAll = async (req, res) => {
  try {
    const data = await statusCourse.aggregate([
      {
        $group: {
          _id: "$course_id",
          subscribers: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: courses.collection.name,
          localField: "_id",
          foreignField: "_id",
          as: "course_info",
        },
      },
      {
        $unwind: {
          path: "$course_info",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          subscribers: 1,
          "course_info.price": 1,
          "course_info.name": 1,
          "course_info.isPublic": 1,
          "course_info.chapters": 1,
          revenue: { $multiply: ["$course_info.price", "$subscribers"] },
        },
      },
    ]);
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
