import { Router } from 'express';
import { createNote, getAllBylessonId, deleteNote, updateNote } from '../controllers/note';

import VerifyToken from '../middlewares/user.middleware';

const notesRoute = new Router();

notesRoute.get('/:lessonId', VerifyToken, getAllBylessonId);

notesRoute.post('/', createNote);
notesRoute.put('/update/:note_id', updateNote);
notesRoute.delete('/delete/:note_id', deleteNote);

export default notesRoute;
