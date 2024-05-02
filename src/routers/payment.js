import { Router } from 'express';
import VerifyToken from '../middlewares/user.middleware';
import { getAll, getAllByUserId } from '../controllers/payment';

const paymentDetailRoute = new Router();

paymentDetailRoute.get('/getall', VerifyToken, getAll);
paymentDetailRoute.get('/getbyuserid', VerifyToken, getAllByUserId);

export default paymentDetailRoute;
