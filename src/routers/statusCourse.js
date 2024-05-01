import { Router } from 'express';
import { addCourseToSttCourse, countUserByCourse, getAllOrByTime, getAllSttCourse } from '../controllers/statusCourse';

const statusCourseRouter = Router();

statusCourseRouter.get('/', getAllOrByTime);
statusCourseRouter.post('/add', addCourseToSttCourse);
statusCourseRouter.get('/getall', getAllSttCourse);
statusCourseRouter.get('/count/:id', countUserByCourse);
export default statusCourseRouter;
