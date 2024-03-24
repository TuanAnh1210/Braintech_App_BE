import _ from "lodash";
import Quizzs from "../models/quizzs";

export const getAll = async (req, res) => {
  try {
    const courses = await Quizzs.find().populate([
      {
        path: "lesson_id",
        select: ["name"],
      },
    ]);
    res.send({
      message: "Get all lessons successfully",
      courses,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};
