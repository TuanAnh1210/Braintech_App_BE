import { Router } from "express";
import { createNote, getAllByClient, deleteNote, updateNote } from "../controllers/note";

const notesRoute = new Router();

notesRoute.get("/:user_id", getAllByClient);
notesRoute.put("/update/:note_id", updateNote);
notesRoute.delete("/delete/:note_id", deleteNote);
notesRoute.post("/", createNote);

export default notesRoute;
