import { Router } from "express";
import { create, getAll } from "../controllers/users";

const usersRouter = Router();

usersRouter.get("/", getAll);
usersRouter.post("/auth", create);

export default usersRouter;
