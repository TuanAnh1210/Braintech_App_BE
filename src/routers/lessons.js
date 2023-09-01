import { Router } from "express";
import { getAll } from "../controllers/lessons";

const lessonsRouter = new Router();

lessonsRouter.get("/", getAll);

export default lessonsRouter;
