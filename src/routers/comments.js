import { Router } from "express";
import {
  deleteComment,
  editComment,
  getAllCommentsByLesson,
  getCommentById,
  postComment,
} from "../controllers/comments";

const commentRoute = new Router();

commentRoute.get("/", getAllCommentsByLesson);
commentRoute.get("/:id", getCommentById);
commentRoute.post("/", postComment);
commentRoute.delete("/:id", deleteComment);
commentRoute.patch("/:id", editComment);
export default commentRoute;
