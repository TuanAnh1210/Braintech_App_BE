import { Router } from 'express';

import * as controllerLessons from '../controllers/lessons';

const lessonsRouter = new Router();

lessonsRouter.get('/', controllerLessons.getAll);
lessonsRouter.get('/:id', controllerLessons.getLessonById);

lessonsRouter.get('/nextLesson', controllerLessons.getNextLesson);

lessonsRouter.post('/create', controllerLessons.createLesson);
lessonsRouter.put('/:lessonId/update', controllerLessons.updateLessonById);

export default lessonsRouter;
