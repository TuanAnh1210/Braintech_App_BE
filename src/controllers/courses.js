import _ from "lodash";
import Courses from "../models/courses";
import { movieSchema, updateMovieSchema } from "../schemas/movieSchema";

export const get = async (req, res) => {
  try {
    const data = await Courses.find().populate([
      {
        path: "cate_id",
        select: ["name"],
      },
    ]);

    // const movies = await Movie.find().populate("casts", "name");
    // const data = await Movie.findOne({ title: "Phim Doraemon" }, { cast: 1 });
    res.send({
      message: "Get movies successfully",
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
    const movie = await Movie.findById(id).populate([
      {
        path: "casts",
        select: ["name", "birthday"],
      },
      {
        path: "genres",
        select: "name",
      },
    ]);
    if (!movie) {
      return res.status(404).json({
        message: "The movie does not exist",
      });
    }
    return res.status(200).send({
      message: "Get movie successfully",
      data: movie,
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
    const movie = await Movie.findByIdAndRemove(id);
    if (movie) {
      res.status(204).send({
        message: "Delete successfully",
        data: movie,
      });
    } else {
      res.status(404).send({
        message: "The movie does not exist",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = movieSchema.validate(body);
    if (error) {
      res.status(400).send({
        message: error.message,
      });
    } else {
      const data = await Movie.create(body);
      res.send({
        message: "Create movie successfully",
        data,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Loi server",
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const { error } = updateMovieSchema.validate(body);
    if (error) {
      res.status(400).send({
        message: error.message,
      });
    } else {
      const data = await Movie.findByIdAndUpdate(id, body, { new: true });
      if (data) {
        res.send({
          message: "Update successfully",
          data,
        });
      } else {
        res.status(400).send({
          message: "Movie is not existed",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: error,
    });
  }
};

export const search = async (req, res) => {
  try {
    const query = req.query.q;

    // Kiểm tra nếu không có từ khóa tìm kiếm được cung cấp
    if (!query) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    // Tìm kiếm phim theo từ khóa
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { extract: { $regex: query, $options: "i" } },
      ],
    }).populate([
      {
        path: "casts",
        select: ["name", "birthday"],
      },
      {
        path: "genres",
        select: "name",
      },
    ]);

    res.status(200).json({
      message: "Search movies successfully",
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// export const getSortedByCreatedAt = async (req, res) => {
//   try {
//     const sortOrder = req.query.sortOrder || "desc";

//     const movies = await Movie.find()
//       .populate([
//         {
//           path: "casts",
//           select: ["name", "birthday"],
//         },
//         {
//           path: "genres",
//           select: "name",
//         },
//       ])
//       .sort({ createdAt: sortOrder });

//     res.status(200).json({
//       message: `Get movies sorted by created time (${sortOrder}) successfully`,
//       data: movies,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

export const getSortedByCreatedAt = async (req, res) => {
  try {
    // const sortOrder = req.query.sortOrder || "desc";
    const year = req.query.year;
    console.log(year, "year");

    const movies = await Movie.find({
      createdAt: { $gte: new Date(year) }, // Lọc các phim có createdAt lớn hơn hoặc bằng năm 2022
    }).populate([
      {
        path: "casts",
        select: ["name", "birthday"],
      },
      {
        path: "genres",
        select: "name",
      },
    ]);
    // .sort({ createdAt: sortOrder });

    res.status(200).json({
      message: `Lấy các phim được tạo từ năm 2022 (${sortOrder}) thành công`,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
