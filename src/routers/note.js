import { Router } from "express";
import { createNote, getAllByClient, deleteNote, updateNote } from "../controllers/note";

const noteRoute = new Router();

noteRoute.get("/:user_id", getAllByClient);
noteRoute.patch("/update/:note_id", updateNote);
noteRoute.delete("/delete/:note_id", deleteNote);
noteRoute.post("/", createNote);

export default noteRoute;
