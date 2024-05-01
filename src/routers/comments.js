import { Router } from 'express';
import * as controllerCmt from '../controllers/comments';
import VerifyToken from '../middlewares/user.middleware';

const commentRoute = new Router();

commentRoute.get('/', controllerCmt.getAllComments);
commentRoute.get('/lesson/:id', controllerCmt.getAllCommentsByLesson);
commentRoute.get('/:id', controllerCmt.getCommentById);
commentRoute.post('/', VerifyToken, controllerCmt.postComment);
commentRoute.delete('/delete/:id', controllerCmt.deleteComment);
commentRoute.patch('/:id', VerifyToken, controllerCmt.editComment);

export default commentRoute;
