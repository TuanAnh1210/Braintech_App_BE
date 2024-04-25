import { Router } from 'express';
import { addCourseToSttCourse, getAllOrByTime } from '../controllers/statusCourse';

const statusCourseRouter = Router();

statusCourseRouter.get('/', getAllOrByTime);
statusCourseRouter.post('/add', addCourseToSttCourse);

export default statusCourseRouter;
