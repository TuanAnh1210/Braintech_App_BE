import { Router } from "express";

import { login, register, getAll, deleteUser, updateUser } from "../controllers/users";
import { checkAdmin } from "../middlewares/adminMiddleware";

const usersRouter = Router();

usersRouter.get("/", getAll);
usersRouter.post("/login", login);
usersRouter.post("/register", register);
usersRouter.patch("/update", updateUser);
usersRouter.delete("/delete/:id", checkAdmin, deleteUser)
export default usersRouter;