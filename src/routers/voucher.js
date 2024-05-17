import express from 'express';

import * as controllerVoucher from '../controllers/voucher.js';
import VerifyToken from '../middlewares/user.middleware.js';

const voucherRouter = express.Router();

voucherRouter.post('/create', controllerVoucher.createVoucher);
voucherRouter.get('/getuserId', VerifyToken, controllerVoucher.getVouchersByUserId);
voucherRouter.get('/', controllerVoucher.getAll);
voucherRouter.get('/:id', controllerVoucher.getVoucherById);
voucherRouter.delete('/:id', controllerVoucher.deleteVoucher1);
voucherRouter.patch('/:id/update', controllerVoucher.updateVoucher);

export default voucherRouter;
