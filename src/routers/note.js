import { Router } from "express";
import { createNote, getAllByClient } from "../controllers/note";

const noteRoute = new Router();

noteRoute.get("/:user_id", getAllByClient);
noteRoute.post("/", createNote);

export default noteRoute;
