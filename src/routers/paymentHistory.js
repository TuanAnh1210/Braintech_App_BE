import { Router } from 'express';

import * as controllerPaymentHistory from '../controllers/paymentHistory';

const paymentRouter = new Router();

paymentRouter.post('/create_payment_url', controllerPaymentHistory.createPaymentUrl);
paymentRouter.get('/callback_vnpay', controllerPaymentHistory.callbackPayment);

export default paymentRouter;
