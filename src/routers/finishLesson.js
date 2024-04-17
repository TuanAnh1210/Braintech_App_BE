import { Router } from "express";
import {
  addLessonToFinishLesson,
  countLessonFinish,
  getAll,
} from "../controllers/finishLesson";

const finishLessonRoute = Router();

finishLessonRoute.get("/:id", getAll);
finishLessonRoute.post("/add", addLessonToFinishLesson);
finishLessonRoute.get("/count/:course_id", countLessonFinish);
export default finishLessonRoute;
