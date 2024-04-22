import User from "../models/users";
import { forgetPasswordSchema, loginSchema, registerSchema } from "../validations/user.validate";
import CreateJwt, { comparePassword } from "../helper/utils";
import bcrypt from 'bcryptjs';

export const getAll = async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      message: "Get all users successfully",
      data: users,
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
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }
    console.log(typeof (user.password));
    const pwStatus = await comparePassword(password, user.password);
    console.log(typeof (password));
    if (!pwStatus) {
      return res.status(400).json({
        error: 1,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }

    const token = CreateJwt({ _id: user._id.toString() });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      user: {
        fullName: user.full_name,
        email: user.email || null,
        avatar: user.avatar,
        accessToken: token,
      },
    });
  } catch (error) {
    console.log("error: login", error);
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
        message: "Tài khoản đã tồn tại trong hệ thống",
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
      message: "Đăng ký thành công",
    });
  } catch (error) {
    console.log("error: register", error);
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
      updateAt: req?.body?.updateAt
    }
    await User.findByIdAndUpdate(req.params.id, userUpdate, {
      new: true,
    });

    return res.status(200).json({
      message: "Đã thay đổi mật khẩu thành công!",
      user: userUpdate
    });
  } catch (error) {
    console.log("error: login", error);
    res.status(500).json({
      message: error,
    });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const findUser = await User.findById(req.params.id)
    if (findUser) {
      const result = await User.deleteOne({ _id: req.params.id });
      return res.status(200).json({
        error: 0,
        data: findUser,
        result: result,
        message: "Xóa thành công",
      });
    }
    else {
      res.status(404).json({
        error: 1,
        message: "Không tìm thấy người dùng",
      });
    }
  } catch (error) {
    console.log("Error: delete user", error);
    res.status(500).json({
      error: 1,
      message: error,
    });
  }
}
