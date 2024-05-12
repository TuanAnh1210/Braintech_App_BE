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
} from '../controllers/users.js';
import VerifyToken from '../middlewares/user.middleware.js';

const usersRouter = Router();

usersRouter.get('/', getAll);
usersRouter.get('/get', VerifyToken, getUser);
usersRouter.get('/:id', getOtherUser);
usersRouter.get('/students', getAllStudent);
usersRouter.get('/teachers', getTeacher);
usersRouter.post('/login', login);
usersRouter.post('/register', register);
usersRouter.put('/forgetPassword/:id', ForgetPassword);
usersRouter.delete('/delete/:id', deleteUser);
usersRouter.patch('/update', updateUser);
usersRouter.patch('/:id/updateVoucher', updateOtherUser);
export default usersRouter;
