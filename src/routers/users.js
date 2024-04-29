import { Router } from "express";

import { login, register, getAll, deleteUser, ForgetPassword, updateUser } from "../controllers/users";

const usersRouter = Router();

usersRouter.get("/", getAll);
usersRouter.post("/login", login);
usersRouter.post("/register", register);
usersRouter.put("/forgetPassword/:id", ForgetPassword);
usersRouter.delete("/delete/:id", deleteUser)
usersRouter.patch("/update", updateUser)
export default usersRouter;
