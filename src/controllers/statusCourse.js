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
