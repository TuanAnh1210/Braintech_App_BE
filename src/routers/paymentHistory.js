import { Router } from 'express';

import * as controllerPaymentHistory from '../controllers/paymentHistory';
import VerifyToken from '../middlewares/user.middleware';

const paymentRouter = new Router();

paymentRouter.post('/create_payment_url', VerifyToken, controllerPaymentHistory.createPaymentUrl);
paymentRouter.get('/callback_vnpay', controllerPaymentHistory.callbackPayment);

export default paymentRouter;
