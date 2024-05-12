import User from '../models/users.js';
import { forgetPasswordSchema, loginSchema, registerSchema } from '../validations/user.validate.js';
import CreateJwt, { comparePassword } from '../helper/utils.js';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getAllStudent = async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false, isTeacher: false });

        res.json({
            message: 'Get all students successfully',
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};
export const getAll = async (req, res) => {
    try {
        const users = await User.find().populate(['vouchers']);

        res.json({
            message: 'Get all users successfully',
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};
export const getUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findOne({ _id: userId }).populate('vouchers');
        res.json({
            message: 'Get user successfully',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

export const getOtherUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findOne({ _id: userId }).populate('vouchers');
        res.json({
            message: 'Get user successfully',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};
export const getTeacher = async (req, res) => {
    try {
        const teachers = await User.find({ isTeacher: true });

        res.json({
            message: 'Get all teacher successfully',
            data: teachers,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { account, auth_type, password } = req.body;

        const error = loginSchema(req.body);

        if (error) {
            return res.status(400).json({
                error: 1,
                message: error.message,
            });
        }

        const user = await User.findOne({ [auth_type]: account });

        if (!user) {
            return res.status(400).json({
                error: 1,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }

        const pwStatus = await comparePassword(password, user.password);

        if (!pwStatus) {
            return res.status(400).json({
                error: 1,
                message: 'Tài khoản hoặc mật khẩu không chính xác',
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, { httpOnly: true });

        return res.status(200).json({
            message: 'Đăng nhập thành công',
            user: {
                _id: user._id,
                fullName: user.full_name,
                email: user.email || null,
                phone: user.phone,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
                isTeacher: user.isTeacher,
                accessToken: token,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

export const register = async (req, res) => {
    try {
        const body = req.body;
        const error = registerSchema(body);

        if (error) {
            return res.status(400).json({
                error: 1,
                message: error.message,
            });
        }

        const userExist = await User.findOne({ [body.auth_type]: body.account });

        if (userExist) {
            return res.status(400).json({
                error: 1,
                message: 'Tài khoản đã tồn tại trong hệ thống',
            });
        }

        const { account, auth_type, full_name, password } = body;

        const user = await User.create({
            full_name: full_name,
            [auth_type]: account,
            password: password,
        });

        const token = CreateJwt({ _id: user._id.toString() });

        return res.status(200).json({
            error: 0,
            user: {
                fullName: user.full_name,
                email: user.email || null,
                avatar: user.avatar,
                accessToken: token,
            },
            message: 'Đăng ký thành công',
        });
    } catch (error) {
        console.log('error: register', error);
        res.status(500).json({
            error: 1,
            message: error,
        });
    }
};

export const ForgetPassword = async (req, res) => {
    try {
        const error = forgetPasswordSchema(req.body);
        console.log(error);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req?.body?.password, salt);

        if (error) {
            return res.status(400).json({
                error: 1,
                message: error.message,
            });
        }
        const userUpdate = {
            _id: req?.body?._id,
            full_name: req?.full_name,
            phone: req?.body?.phone,
            password: hashedPassword,
            avatar: req?.body?.avatar,
            createAt: req?.body?.createAt,
            updateAt: req?.body?.updateAt,
        };
        await User.findByIdAndUpdate(req.params.id, userUpdate, {
            new: true,
        });

        return res.status(200).json({
            message: 'Đã thay đổi mật khẩu thành công!',
            user: userUpdate,
        });
    } catch (error) {
        console.log('error: login', error);
        res.status(500).json({
            message: error,
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const findUser = await User.findById(req.params.id);
        if (findUser) {
            const result = await User.deleteOne({ _id: req.params.id });
            return res.status(200).json({
                error: 0,
                data: findUser,
                result: result,
                message: 'Xóa thành công',
            });
        } else {
            res.status(404).json({
                error: 1,
                message: 'Không tìm thấy người dùng',
            });
        }
    } catch (error) {
        console.log('Error: delete user', error);
        res.status(500).json({
            error: 1,
            message: error,
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { accessToken } = req.body;
        if (!accessToken) return res.status(500).json({ message: 'Token not provide!' });
        const { _id } = jwt.verify(accessToken, process.env.JWT_SECRET);
        const findUser = await User.findById(_id);
        const data = req.body;
        if (findUser) {
            const result = await User.findOneAndUpdate({ _id: _id }, data, { new: true });
            return res.status(200).json({
                error: 0,
                result: result,
                message: 'Sửa thành công',
            });
        } else {
            res.status(404).json({
                error: 1,
                message: 'Không tìm thấy người dùng',
            });
        }
    } catch (error) {
        console.log('Error: update user', error);
        res.status(500).json({
            error: 1,
            message: error,
        });
    }
};

export const updateOtherUser = async (req, res) => {
    try {
        const { accessToken } = req.body;
        if (!accessToken) return res.status(500).json({ message: 'Token not provide!' });
        const userId = req.params.id;
        const findUser = await User.findById({ _id: userId });
        console.log('Founded user', findUser);
        const data = req.body;
        if (findUser) {
            const result = await User.updateMany({ _id: userId }, data, { new: true });
            return res.status(200).json({
                error: 0,
                result: result,
                message: 'Sửa thành công',
            });
        } else {
            res.status(404).json({
                error: 1,
                message: 'Không tìm thấy người dùng',
            });
        }
    } catch (error) {
        console.log('Error: update user', error);
        res.status(500).json({
            error: 1,
            message: error,
        });
    }
};
