import { Router } from 'express';

import VerifyToken from '../middlewares/user.middleware.js';
import { addNotify, getAllNotiByUserId } from '../controllers/noti.js';

const notiRoute = new Router();

notiRoute.get('/:userId', getAllNotiByUserId);
notiRoute.post('/addNoti', addNotify);

export default notiRoute;
