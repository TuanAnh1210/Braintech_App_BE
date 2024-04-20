import { Router } from "express";
import { createNote, deleteNote, getAllByClient } from "../controllers/note";

const noteRoute = new Router();

noteRoute.get("/:user_id", getAllByClient);
noteRoute.delete("/delete/:note_id", deleteNote);
noteRoute.post("/", createNote);

export default noteRoute;
