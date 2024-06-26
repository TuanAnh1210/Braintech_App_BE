import { Router } from 'express';

import {
    login,
    register,
    getAll,
    deleteUser,
    ForgetPassword,
    updateUser,
    getTeacher,
    getAllStudent,
    updateOtherUser,
    getUser,
    getOtherUser,
    UpdateRole,
    UpdateCouresId,
    removeExpiredVouchers,
} from '../controllers/users.js';
import VerifyToken from '../middlewares/user.middleware.js';

const usersRouter = Router();

usersRouter.get('/', getAll);
usersRouter.get('/get', VerifyToken, getUser);
usersRouter.get('/:id', getOtherUser);
usersRouter.get('/all/students', getAllStudent);
usersRouter.get('/all/teachers', getTeacher);

usersRouter.post('/login', login);
usersRouter.post('/register', register);
usersRouter.put('/forgetPassword/:id', ForgetPassword);
usersRouter.put('/update/:id', UpdateRole);
usersRouter.put('/updatecourse/:id', UpdateCouresId);
usersRouter.delete('/delete/:id', deleteUser);
usersRouter.patch('/update', updateUser);
usersRouter.patch('/:id/updateVoucher', updateOtherUser);
usersRouter.patch('/removeExpiredVouchers', removeExpiredVouchers);

export default usersRouter;
