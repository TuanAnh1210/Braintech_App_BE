import { Router } from 'express';
import {
    deleteComment,
    editComment,
    getAllCommentsByLesson,
    getCommentById,
    postComment,
} from '../controllers/comments';
import { checkAdmin } from '../middlewares/adminMiddleware';

const commentRoute = new Router();

commentRoute.get('/lesson/:id', getAllCommentsByLesson);
commentRoute.get('/:id', getCommentById);
commentRoute.post('/', postComment);
commentRoute.delete('/delete/:id', deleteComment);
commentRoute.patch('/:id', editComment);
export default commentRoute;
