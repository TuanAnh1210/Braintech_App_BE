import { Router } from "express";
import { getAllCommentsByLesson, postComment } from "../controllers/comments";

const commentRoute = new Router();

commentRoute.get("/:id", getAllCommentsByLesson);
commentRoute.post("/", postComment);

export default commentRoute;
