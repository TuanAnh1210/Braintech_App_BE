import { Router } from 'express';
import {
    addCourseToSttCourse,
    countUserByCourse,
    getAllOrByTime,
    getAllSttCourse,
    updateSttCourse,
} from '../controllers/statusCourse';
import VerifyToken from '../middlewares/user.middleware';

const statusCourseRouter = Router();

statusCourseRouter.get('/', getAllOrByTime);
statusCourseRouter.post('/add', VerifyToken, addCourseToSttCourse);
statusCourseRouter.put('/updatesttCourse', VerifyToken, updateSttCourse);
statusCourseRouter.get('/getall', getAllSttCourse);
statusCourseRouter.get('/count/:id', countUserByCourse);
export default statusCourseRouter;
