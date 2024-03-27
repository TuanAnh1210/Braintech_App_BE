import express from "express";
import { getAll } from "../controllers/quizzs";

const quizzsRouter = express.Router();

quizzsRouter.get("/all", getAll);

export default quizzsRouter;
