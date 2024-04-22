import express from 'express';

import { upload, uploadVideo } from '../middlewares/multer.middleware';
import * as controllerCourses from '../controllers/courses';

const coursesRouter = express.Router();

coursesRouter.get('/', controllerCourses.get);
coursesRouter.get('/all', controllerCourses.getAll);
coursesRouter.get('/:_id', controllerCourses.getCourseById);

coursesRouter.post('/create', controllerCourses.createCourse);
coursesRouter.put('/:_id/update', controllerCourses.updateCourse);
coursesRouter.delete('/:_id/delete', controllerCourses.deleteCourse);
coursesRouter.post('/upload', upload.single('image'), controllerCourses.uploadImage);
coursesRouter.post('/upload-video', uploadVideo.single('video'), controllerCourses.uploadVideo);

export default coursesRouter;
