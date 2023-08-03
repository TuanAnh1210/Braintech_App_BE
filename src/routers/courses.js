import express from "express";
import { get, getAll } from "../controllers/courses";

const coursesRouter = express.Router();

coursesRouter.get("/", get);
coursesRouter.get("/all", getAll);

export default coursesRouter;
