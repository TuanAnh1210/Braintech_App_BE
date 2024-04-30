import { Router } from 'express';

import * as controllerPaymentHistory from '../controllers/paymentHistory';
import VerifyToken from '../middlewares/user.middleware';

const paymentRouter = new Router();

paymentRouter.post('/create_payment_url', VerifyToken, controllerPaymentHistory.createPaymentUrl);
paymentRouter.get('/callback_vnpay', controllerPaymentHistory.callbackPayment);
paymentRouter.get('/', controllerPaymentHistory.getAllPayment);
paymentRouter.get('/getBought/:user_id', controllerPaymentHistory.getPaymentByID);
paymentRouter.get('/:transactionId', controllerPaymentHistory.getPaymentByID);

export default paymentRouter;
