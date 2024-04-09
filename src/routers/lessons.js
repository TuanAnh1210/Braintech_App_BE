import { Router } from 'express';

import * as controllerLessons from '../controllers/lessons';

const lessonsRouter = new Router();

lessonsRouter.get('/', controllerLessons.getAll);

lessonsRouter.put('/:lessonId/update', controllerLessons.updateLessonById);

export default lessonsRouter;
