import { Router } from "express";

import { login, register, getAll } from "../controllers/users";

const usersRouter = Router();

usersRouter.get("/", getAll);
usersRouter.post("/login", login);
usersRouter.post("/register", register);

export default usersRouter;
