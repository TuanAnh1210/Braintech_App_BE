import { Router } from "express";

import { login, register, getAll, deleteUser, ForgetPassword, updateUser, getTeacher, getAllStudent } from "../controllers/users.js";

const usersRouter = Router();

usersRouter.get("/", getAll);
usersRouter.get("/students", getAllStudent);
usersRouter.get("/teachers", getTeacher);
usersRouter.post("/login", login);
usersRouter.post("/register", register);
usersRouter.put("/forgetPassword/:id", ForgetPassword);
usersRouter.delete("/delete/:id", deleteUser)
usersRouter.patch("/update", updateUser)
export default usersRouter;
