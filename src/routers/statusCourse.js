import { Router } from "express";
import { getAll } from "../controllers/statusCourse";

const statusCourseRouter = Router();

statusCourseRouter.get("/", getAll);

export default statusCourseRouter;
