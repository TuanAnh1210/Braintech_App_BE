import express from "express";
import { get, getAll, getDetail } from "../controllers/courses";

const coursesRouter = express.Router();

coursesRouter.get("/", get);
coursesRouter.get("/all", getAll);
coursesRouter.get("/:id", getDetail);

export default coursesRouter;
