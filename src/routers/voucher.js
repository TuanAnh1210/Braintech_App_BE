import express from 'express';

import * as controllerVoucher from '../controllers/voucher.js';

const voucherRouter = express.Router();

voucherRouter.post('/create', controllerVoucher.createVoucher);
voucherRouter.get('/', controllerVoucher.getAll);
voucherRouter.get('/:id', controllerVoucher.getVoucherById);
voucherRouter.delete('/:id', controllerVoucher.deleteVoucher1);

export default voucherRouter;
