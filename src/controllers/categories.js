import Categories from "../models/categories";
import { castSchema, updateCastSchema } from "../schemas/castSchema";
import { updateMovieSchema } from "../schemas/movieSchema";

export const get = async (req, res) => {
  try {
    const data = await Categories.find();
    res.send({
      message: "Get casts successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const cast = await Cast.findById(id);
    if (!cast) {
      return res.status(404).json({
        message: "The cast does not exist",
      });
    }
    return res.status(200).send({
      message: "Get cast successfully",
      data: cast,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const cast = await Cast.findByIdAndRemove(id);
    if (cast) {
      res.status(204).send({
        message: "Delete successfully",
        data: cast,
      });
    } else {
      res.status(404).send({
        message: "The cast does not exist",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { error } = updateCastSchema.validate(body);
    if (error) {
      res.status(400).send({
        message: error.message,
      });
    } else {
      const data = await Cast.findByIdAndUpdate(id, body, { new: true });
      if (data) {
        res.send({
          message: "Update successfully",
          data,
        });
      } else {
        res.status(400).send({
          message: "Cast is not existed",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: err,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const { error } = castSchema.validate(body);
    if (error) {
      res.status(400).send({
        message: error.message,
      });
    } else {
      const data = await Cast.create(body);
      res.send({
        message: "Create cast successfully",
        data,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Loi server",
    });
  }
};

export const search = async (req, res) => {
  try {
    const query = req.query.q;
    const casts = await Cast.find({ $text: { $search: query } });
    res.send({
      message: "Search movies successfully",
      data: casts,
    });
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};
