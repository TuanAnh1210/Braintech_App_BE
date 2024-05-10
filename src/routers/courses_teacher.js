import express from 'express';

import { upload, uploadVideo } from '../middlewares/multer.middleware.js';
import * as controllerCourses from '../controllers/courses_teacher.js';

import VerifyToken from '../middlewares/user.middleware.js';

const coursesRouter = express.Router();

coursesRouter.get('/all', controllerCourses.getCourseByTeacher);
coursesRouter.get('/all/teacher', controllerCourses.getAll);
// coursesRouter.get('/all', controllerCourses.getAll);
coursesRouter.get('/all/client', controllerCourses.getAllClient);
coursesRouter.get('/all/student', controllerCourses.getStudentsByTeacher);
coursesRouter.get('/:courseId/learning', VerifyToken, controllerCourses.getCourseLearning);
coursesRouter.get('/:courseId', controllerCourses.getCourseById);
coursesRouter.get("/teacher/:id", controllerCourses.getCourseByTeacherIDs);
coursesRouter.post('/create', controllerCourses.createCourse);
coursesRouter.put('/:_id/update', controllerCourses.updateCourse);
coursesRouter.put('/update/:id', controllerCourses.updateCourseID);
coursesRouter.delete('/:_id/delete', controllerCourses.deleteCourse);
coursesRouter.delete('/delete/:id', controllerCourses.deleteCourseTeacher);
coursesRouter.post('/upload', upload.single('image'), controllerCourses.uploadImage);
coursesRouter.post('/upload-video', uploadVideo.single('video'), controllerCourses.uploadVideo);

export default coursesRouter;
