import express from "express";
import {
  create,
  get,
  getById,
  remove,
  search,
  update,
} from "../controllers/genres";

const genresRouter = express.Router();

genresRouter.get("/genres", get);
genresRouter.get("/genres/:id", getById);
genresRouter.get("/search", search);
genresRouter.post("/genres", create);
genresRouter.patch("/genres/:id", update);
genresRouter.delete("/genres/:id", remove);

export default genresRouter;
