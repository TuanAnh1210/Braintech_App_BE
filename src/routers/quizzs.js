import express from 'express';

import * as controllerQuizzs from '../controllers/quizzs.js';

const quizzsRouter = express.Router();

quizzsRouter.get('/:lessonId/all', controllerQuizzs.getQuizzsByLessonId);
quizzsRouter.post('/create', controllerQuizzs.createQuizz);

export default quizzsRouter;
