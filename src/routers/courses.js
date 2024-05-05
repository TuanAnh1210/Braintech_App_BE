import express from 'express';

import { upload, uploadVideo } from '../middlewares/multer.middleware.js';
import * as controllerCourses from '../controllers/courses.js';

import VerifyToken from '../middlewares/user.middleware.js';

const coursesRouter = express.Router();

coursesRouter.get('/', controllerCourses.get);
coursesRouter.get('/all', controllerCourses.getAll);
coursesRouter.get('/all/client', controllerCourses.getAllClient);
coursesRouter.get('/:courseId/learning', VerifyToken, controllerCourses.getCourseLearning);
coursesRouter.get('/:courseId', controllerCourses.getCourseById);

coursesRouter.post('/create', controllerCourses.createCourse);
coursesRouter.put('/:_id/update', controllerCourses.updateCourse);
coursesRouter.delete('/:_id/delete', controllerCourses.deleteCourse);
coursesRouter.post('/upload', upload.single('image'), controllerCourses.uploadImage);
coursesRouter.post('/upload-video', uploadVideo.single('video'), controllerCourses.uploadVideo);

export default coursesRouter;
