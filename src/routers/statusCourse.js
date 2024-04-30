import { Router } from 'express';
import {
    addCourseToSttCourse,
    countUserByCourse,
    getAllCourseFinish,
    getAllCourseJoin,
    getAllOrByTime,
} from '../controllers/statusCourse';

const statusCourseRouter = Router();

statusCourseRouter.get('/', getAllOrByTime);
statusCourseRouter.post('/add', addCourseToSttCourse);
statusCourseRouter.get('/finishCourse/:user_id', getAllCourseFinish);
statusCourseRouter.get('/joinedCourse/:user_id', getAllCourseJoin);
statusCourseRouter.get('/count/:id', countUserByCourse);
export default statusCourseRouter;
