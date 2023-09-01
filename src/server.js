import express from "express";
import mongoose from "mongoose";

import bodyParser from "body-parser";

import uploadRouter from "./routers/upload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import coursesRouter from "./routers/courses";
import cateRouter from "./routers/categories";
import chaptersRouter from "./routers/chapters";
import lessonsRouter from "./routers/lessons";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
const port = 8080;

// Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // Thay thế bằng nguồn gốc của trang web hiện tại
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Static
app.use(express.static("src/public"));

// Router
app.use("/api/courses", coursesRouter);
app.use("/api/lessons", lessonsRouter);
app.use("/api/cate", cateRouter);
app.use("/api/chapters", chaptersRouter);
app.use("/upload", uploadRouter);

mongoose
  .connect("mongodb://localhost:27017/braintech")
  .then(() => console.log("Connected to DB"));

app.listen(port, () => {
  console.log("Server is running on " + port);
});
