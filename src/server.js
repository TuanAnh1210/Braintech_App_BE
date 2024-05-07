import createError from 'http-errors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import uploadRouter from './routers/upload.js';
import coursesRouter from './routers/courses.js';
import coursesTeacherRouter from './routers/courses_teacher.js';
import cateRouter from './routers/categories.js';
import chaptersRouter from './routers/chapters.js';
import chaptersTeacherRouter from './routers/chapterTeacher.js';
import lessonsRouter from './routers/lessons.js';
import usersRouter from './routers/users.js';
import statusCourseRouter from './routers/statusCourse.js';
import notesRouter from './routers/note.js';
import quizzsRouter from './routers/quizzs.js';
import commentRoute from './routers/comments.js';
import finishLessonRoute from './routers/finishLesson.js';
import noteRoute from './routers/note.js';

import cookieParser from 'cookie-parser';

import paymentRouter from './routers/paymentHistory.js';
import paymentDetailRoute from './routers/payment.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
// const port = 8080;

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
// Static
app.use(express.static('src/public'));

// Router
app.use('/api/courses', coursesRouter);
app.use('/api/courses_teacher', coursesTeacherRouter);
app.use('/api/paymentDetail', paymentDetailRoute);
app.use('/api/notes', notesRouter);
app.use('/api/lessons', lessonsRouter);
app.use('/api/sttCourse', statusCourseRouter);
app.use('/api/user', usersRouter);
app.use('/api/quizzs', quizzsRouter);
app.use('/api/categories', cateRouter);
app.use('/api/comments', commentRoute);
app.use('/api/chapters', chaptersRouter);
app.use('/api/chapters/teacher', chaptersTeacherRouter);
app.use('/upload', uploadRouter);
app.use('/api/finishLesson', finishLessonRoute);
app.use('/api/comments', commentRoute);
app.use('/api/notes', noteRoute);
app.use('/api/payment', paymentRouter);

app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: statusCode,
        message: err.message || 'Internal Server Error',
    });
});

mongoose.connect(process.env.DB_URL).then(() => console.log('Connected to DB'));

app.listen(process.env.PORT, () => {
    console.log('Server is running on ' + process.env.PORT);
});
