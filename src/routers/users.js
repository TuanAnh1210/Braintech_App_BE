import { Router } from "express";

import { login, register, getAll, deleteUser, updateUser } from "../controllers/users";

const usersRouter = Router();

usersRouter.get("/", getAll);
usersRouter.post("/login", login);
usersRouter.post("/register", register);
usersRouter.patch("/update", updateUser);
usersRouter.delete("/delete/:id", deleteUser)
export default usersRouter;
