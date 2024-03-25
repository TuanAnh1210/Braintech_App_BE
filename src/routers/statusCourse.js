import { Router } from "express";
import { addCourseToSttCourse, getAll } from "../controllers/statusCourse";

const statusCourseRouter = Router();

statusCourseRouter.get("/", getAll);
statusCourseRouter.post("/add", addCourseToSttCourse);

export default statusCourseRouter;
