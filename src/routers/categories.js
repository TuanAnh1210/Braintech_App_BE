import express from "express";
import { getAll } from "../controllers/categories";

const cateRouter = express.Router();

cateRouter.get("/", getAll);

export default cateRouter;
