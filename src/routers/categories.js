import express from "express";
import { get } from "../controllers/categories";

const cateRouter = express.Router();

cateRouter.get("/", get);

export default cateRouter;
