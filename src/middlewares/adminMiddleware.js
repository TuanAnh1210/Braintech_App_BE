import jwt from 'jsonwebtoken';
import User from '../models/users';
import 'dotenv/config';
export const checkAdmin = async (req, res, next) => {
    const key = process.env.JWT_SECRET;
    if (!req.headers?.authorization) {
        res.status(401).send({
            message: 'Token không xác định',
        });
        return;
    }
    try {
        const token = req.headers?.authorization.split(' ')[1];

        if (!token) {
            res.status(401).send({
                message: 'Lỗi xác thực người dùng',
            });
            return;
        }
        const decoded = jwt.verify(token, key);
        if (!decoded) {
            res.status(401).send({
                message: 'Lỗi xác thực người dùng',
            });
            return;
        }
        const _id = decoded.data._id;
        const user = await User.findById(_id);
        if (!user.isAdmin) {
            res.status(401).send({
                message: 'Không có quyền truy cập tài nguyên',
            });
            return;
        }
        next();
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Có lỗi xảy ra',
        });
    }
};
