import { Router } from 'express';
import * as controllerCmt from '../controllers/comments.js';
import VerifyToken from '../middlewares/user.middleware.js';

const commentRoute = new Router();

commentRoute.get('/', controllerCmt.getAllComments);
commentRoute.get('/lesson/:id', VerifyToken, controllerCmt.getAllCommentsByLesson);
commentRoute.get('/:id', controllerCmt.getCommentById);
commentRoute.post('/', VerifyToken, controllerCmt.postComment);
commentRoute.delete('/delete/:id', VerifyToken, controllerCmt.deleteComment);
commentRoute.patch('/:id', VerifyToken, controllerCmt.editComment);

export default commentRoute;
