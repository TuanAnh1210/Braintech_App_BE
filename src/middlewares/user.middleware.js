import jwt from 'jsonwebtoken';
import 'dotenv/config';

import User from '../models/users';

const VerifyToken = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET;

    const authorization = req.headers.authorization;

    if (authorization && authorization.split(' ')[1]) {
        const accessToken = authorization.split(' ')[1];
        console.log(accessToken, 'accessToken');
        jwt.verify(accessToken, JWT_SECRET, async (err, decoded) => {
            console.log(err, 'day là err');
            console.log(decoded, 'day là decoded');
            if (err || !decoded) {
                return res.status(401).json({
                    error: 1,
                    message: 'Authentication session has expired.',
                });
            }

            const { _id } = decoded;
            console.log(_id, '_id');
            const user = await User.findOne({ _id }).select(['_id']);

            if (!user) {
                return res.status(401).json({
                    error: 1,
                    message: 'Authentication session has expired.',
                });
            }

            req.userId = _id;
            next();
        });
    } else {
        return res.status(401).json({
            error: 1,
            message: 'Access to this resource is forbidden.',
        });
    }
};

export default VerifyToken;
