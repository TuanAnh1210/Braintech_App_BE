import { Router } from "express";
import {
  deleteComment,
  getAllCommentsByLesson,
  postComment,
} from "../controllers/comments";

const commentRoute = new Router();

commentRoute.get("/:id", getAllCommentsByLesson);
commentRoute.delete("/delete/:id_cmt", deleteComment);
commentRoute.post("/", postComment);

export default commentRoute;
