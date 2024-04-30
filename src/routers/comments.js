import { Router } from 'express';
import {
    deleteComment,
    editComment,
    getAllComments,
    getAllCommentsByLesson,
    getCommentById,
    postComment,
} from '../controllers/comments';

const commentRoute = new Router();

commentRoute.get('/', getAllComments);
commentRoute.get('/lesson/:id', getAllCommentsByLesson);
commentRoute.get('/:id', getCommentById);
commentRoute.post('/', postComment);
commentRoute.delete('/delete/:id', deleteComment);
commentRoute.patch('/:id', editComment);
export default commentRoute;
