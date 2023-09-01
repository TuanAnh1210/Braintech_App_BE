import { Router } from "express";
import { getAll } from "../controllers/chapters";

const chaptersRouter = new Router();

chaptersRouter.get("/", getAll);

export default chaptersRouter;
