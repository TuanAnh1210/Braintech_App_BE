import { Router } from 'express';
import { createNote, getAllBylessonId, deleteNote, updateNote } from '../controllers/note.js';

import VerifyToken from '../middlewares/user.middleware.js';

const notesRoute = new Router();

notesRoute.get('/:lessonId', VerifyToken, getAllBylessonId);

notesRoute.post('/', VerifyToken, createNote);
notesRoute.put('/update/:note_id', VerifyToken, updateNote);
notesRoute.delete('/delete/:note_id', VerifyToken, deleteNote);

export default notesRoute;
