import express from "express";
import {
  create,
  get,
  getById,
  getSortedByCreatedAt,
  remove,
  search,
  update,
} from "../controllers/courses";

const movieRouter = express.Router();

movieRouter.get("/courses", get);
movieRouter.get("/movies/:id", getById);
movieRouter.get("/search", search);
movieRouter.get("/sort-movie/sorted-by-createdAt", getSortedByCreatedAt);
// /sort-movie/sorted-by-createdAt?sortOrder=desc
// /sort-movie/sorted-by-createdAt?sortOrder=asc
movieRouter.post("/movies", create);
movieRouter.patch("/movies/:id", update);
movieRouter.delete("/movies/:id", remove);

export default movieRouter;
