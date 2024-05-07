import { Router } from 'express';
import VerifyToken from '../middlewares/user.middleware.js';
import { getAll, getAllByUserId } from '../controllers/payment.js';

const paymentDetailRoute = new Router();

paymentDetailRoute.get('/getall', VerifyToken, getAll);
paymentDetailRoute.get('/getbyuserid', VerifyToken, getAllByUserId);

export default paymentDetailRoute;
