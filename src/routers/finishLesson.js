import { Router } from "express";
import { addLessonToFinishLesson, getAll } from "../controllers/finishLesson";

const finishLessonRoute = Router();

finishLessonRoute.get("/:id", getAll);
finishLessonRoute.post("/add", addLessonToFinishLesson);
export default finishLessonRoute;
