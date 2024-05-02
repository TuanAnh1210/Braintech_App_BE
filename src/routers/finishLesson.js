import { Router } from 'express';
import {
    addLessonToFinishLesson,
    countLessonFinish,
    getAll,
    getFinishLessonByCourseId,
} from '../controllers/finishLesson';
import VerifyToken from '../middlewares/user.middleware';

const finishLessonRoute = Router();

finishLessonRoute.get('/', VerifyToken, getAll);
finishLessonRoute.get('/:courseId', VerifyToken, getFinishLessonByCourseId);
finishLessonRoute.post('/add', VerifyToken, addLessonToFinishLesson);
finishLessonRoute.get('/count/:course_id', VerifyToken, countLessonFinish);
export default finishLessonRoute;
