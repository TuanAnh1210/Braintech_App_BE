import _ from "lodash";
import Courses from "../models/courses";

export const get = async (req, res) => {
  const {
    _page = 1,
    _limit = 5,
    _sort = "createAt",
    _order = "asc",
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
    populate: [
      {
        path: "cate_id",
        select: ["name"],
      },
    ],
  };
  try {
    const { docs: courses } = await Courses.paginate({}, options);

    if (courses.length === 0) {
      res.status(404).json({
        message: "Courses does not exist",
      });
    }

    res.send({
      message: "Get Courses successfully",
      courses,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const courses = await Courses.find().populate([
      {
        path: "cate_id",
        select: ["name"],
      },
    ]);
    res.send({
      message: "Get all courses successfully",
      courses,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const getDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // const course = await Courses.findById(id).populate([
    //   {
    //     path: "chapters",
    //     select: "name",
    //   },
    // ]);
    const selectedCourse = await Courses.findById(id).populate({
      path: "chapters",
      select: ["name", "lessons"],
      populate: {
        path: "lessons",
        select: ["name", "path_video"], // Chọn trường 'title' từ collection Lesson
      },
    });

    res.send({
      message: "Get course successfully",
      courses: selectedCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error,
    });
  }
};
