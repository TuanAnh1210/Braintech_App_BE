import { Router } from 'express';

import * as controllerchapters from '../controllers/chapters';

const chaptersRouter = new Router();

chaptersRouter.get('/', controllerchapters.getAll);
chaptersRouter.get('/:chapterId', controllerchapters.getChapterById);

chaptersRouter.post('/create', controllerchapters.createChapter);
chaptersRouter.put('/:chapterId/update', controllerchapters.updateChapter);

export default chaptersRouter;
