import express from "express";
import mongoose from "mongoose";
import movieRouter from "./routers/courses";
import bodyParser from "body-parser";
import castRouter from "./routers/categories";
import genresRouter from "./routers/genres";
import uploadRouter from "./routers/upload";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
const port = 8080;

// Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Static
app.use(express.static("src/public"));

// Router
app.use("/api", movieRouter);
// app.use("/api", castRouter);
// app.use("/api", genresRouter);
app.use("/upload", uploadRouter);

mongoose
  .connect("mongodb://localhost:27017/braintech")
  .then(() => console.log("Connected to DB"));

app.listen(port, () => {
  console.log("Server is running on " + port);
});
