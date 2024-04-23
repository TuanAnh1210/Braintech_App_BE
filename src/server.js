import createError from 'http-errors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

import uploadRouter from './routers/upload';
import coursesRouter from './routers/courses';
import cateRouter from './routers/categories';
import chaptersRouter from './routers/chapters';
import lessonsRouter from './routers/lessons';
import usersRouter from './routers/users';
import statusCourseRouter from './routers/statusCourse';
import quizzsRouter from './routers/quizzs';
import commentRoute from './routers/comments';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
// Static
app.use(express.static('src/public'));

// Router
app.use('/api/courses', coursesRouter);
app.use('/api/lessons', lessonsRouter);
app.use('/api/sttCourse', statusCourseRouter);
app.use('/api/user', usersRouter);
app.use('/api/quizzs', quizzsRouter);
app.use('/api/categories', cateRouter);
app.use('/api/comments', commentRoute);
app.use('/api/chapters', chaptersRouter);
app.use('/upload', uploadRouter);
app.use('/api/finishLesson', finishLessonRoute);
app.use('/api/comments', commentRoute);
app.use('/api/notes', noteRoute);

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

mongoose.connect('mongodb://127.0.0.1:27017/braintech').then(() => console.log('Connected to DB'));

app.listen(port, () => {
    console.log('Server is running on ' + port);
});
