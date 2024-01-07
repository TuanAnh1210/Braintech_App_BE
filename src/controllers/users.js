import Users from "../models/users";

export const getAll = async (req, res) => {
  try {
    const users = await Users.find();

    res.send({
      message: "Get all users successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    if (!body.password) {
      const user = Users.create(body);

      return res.send({
        message: "Login successfully",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};
