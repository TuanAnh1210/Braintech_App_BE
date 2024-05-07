import { Router } from "express";

import { login, register, getAll, deleteUser, ForgetPassword, updateUser, getTeacher, getAllStudent, UpdateRole } from "../controllers/users.js";
import { checkAdmin } from "../middlewares/adminMiddleware.js";

const usersRouter = Router();

usersRouter.get("/", getAll);
usersRouter.get("/students", getAllStudent);
usersRouter.get("/teachers", getTeacher);
usersRouter.post("/login", login);
usersRouter.post("/register", register);
usersRouter.put("/forgetPassword/:id", ForgetPassword);
usersRouter.put("/update/:id", UpdateRole);
usersRouter.delete("/delete/:id", deleteUser)
usersRouter.patch("/update", updateUser)
export default usersRouter;
