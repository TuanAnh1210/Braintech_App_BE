import { Router } from 'express';
import { getAllByUserId } from '../controllers/payment';

const paymentDetailRoute = new Router();

paymentDetailRoute.get('/getall', getAllByUserId);

export default paymentDetailRoute;
