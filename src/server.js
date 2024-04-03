import createError from "http-errors";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { dirname } from "path";

import uploadRouter from "./routers/upload";
import coursesRouter from "./routers/courses";
import cateRouter from "./routers/categories";
import chaptersRouter from "./routers/chapters";
import lessonsRouter from "./routers/lessons";
import usersRouter from "./routers/users";
import statusCourseRouter from "./routers/statusCourse";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
const port = 8080;

// Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Thay thế bằng nguồn gốc của trang web hiện tại
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// Static
app.use(express.static("src/public"));

// Router
app.use("/api/courses", coursesRouter);
app.use("/api/lessons", lessonsRouter);
app.use("/api/sttCourse", statusCourseRouter);
app.use("/api/user", usersRouter);
app.use("/api/categories", cateRouter);
app.use("/api/chapters", chaptersRouter);
app.use("/upload", uploadRouter);

app.use((req, res, next) => {
  next(createError.NotFound("This route does not exist."));
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message || "Internal Server Error",
  });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/braintech")
  .then(() => console.log("Connected to DB"));

app.listen(port, () => {
  console.log("Server is running on " + port);
});
