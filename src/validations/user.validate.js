import Joi from "joi";

export const loginSchema = (data) => {
  const schema = Joi.object({
    auth_type: Joi.string().valid("email", "phone").required(),
    account: Joi.when("auth_type", {
      is: "email",
      then: Joi.string()
        .email({ tlds: { allow: false } })
        .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
        .required()
        .messages({
          "string.email": "Địa chỉ email không hợp lệ",
          "string.empty": "Địa chỉ email không hợp lệ",
          "any.required": "Email là trường bắt buộc",
          "string.pattern.base": "Email phải có định dạng @gmail.com",
        }),
      otherwise: Joi.string()
        .regex(/(0[3|5|7|8|9])+([0-9]{8})\b/)
        .required()
        .messages({
          "string.empty": "Vui lòng nhập số điện thoại hợp lệ",
          "string.pattern.base": "Số điện thoại không hợp lệ",
        }),
    }),
    password: Joi.string().min(6).max(50).required().messages({
      "string.empty": "Vui lòng nhập mật khẩu",
      "string.min": "Mật khẩu phải chứa ít nhất {#limit} ký tự",
      "string.max": "Mật khẩu không được dài quá {#limit} ký tự",
      "any.required": "Mật khẩu là trường bắt buộc",
    }),
  });

  const { error } = schema.validate(data);

  if (error) return { message: error.message };
};

export const registerSchema = (data) => {
  const schema = Joi.object({
    auth_type: Joi.string().valid("email", "phone").required(),
    account: Joi.when("auth_type", {
      is: "email",
      then: Joi.string()
        .email({ tlds: { allow: false } })
        .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
        .required()
        .messages({
          "string.email": "Địa chỉ email không hợp lệ",
          "string.empty": "Địa chỉ email không hợp lệ",
          "any.required": "Email là trường bắt buộc",
          "string.pattern.base": "Email phải có định dạng @gmail.com",
        }),
      otherwise: Joi.string()
        .regex(/(0[3|5|7|8|9])+([0-9]{8})\b/)
        .required()
        .messages({
          "string.empty": "Vui lòng nhập số điện thoại hợp lệ",
          "string.pattern.base": "Số điện thoại không hợp lệ",
        }),
    }),

    full_name: Joi.string().required().messages({
      "string.empty": "Vui lòng nhập họ và tên",
      "any.required": "Họ và tên là trường bắt buộc",
    }),
    password: Joi.string().trim().min(6).max(50).required().messages({
      "string.empty": "Vui lòng nhập mật khẩu",
      "string.min": `Mật khẩu phải chứa ít nhất {#limit} ký tự`,
      "string.max": "Mật khẩu không được dài quá {#limit} ký tự",
      "any.required": "Mật khẩu là trường bắt buộc",
    }),
    password_confirm: Joi.string().trim()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "string.empty": "Vui lòng nhập lại mật khẩu",
        "any.only": "Mật khẩu nhập lại không khớp",
        "any.required": "Vui lòng nhập lại mật khẩu",
      }),
  });

  const { error } = schema.validate(data);

  if (error) return { message: error.message };
};
export const forgetPasswordSchema = (data) => {
  const schema = Joi.object({
    _id: Joi.string(),
    full_name: Joi.string(),
    email: Joi.string(),
    avatar: Joi.string(),
    phone: Joi.string(),
    isAdmin: false,
    createdAt: Joi.string(),
    updatedAt: Joi.string(),
    password: Joi.string().min(6).max(50).required().messages({
      "string.empty": "Vui lòng nhập mật khẩu",
      "string.min": "Mật khẩu phải chứa ít nhất {#limit} ký tự",
      "string.max": "Mật khẩu không được dài quá {#limit} ký tự",
      "any.required": "Mật khẩu là trường bắt buộc",
    }),
    password_confirm: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "string.empty": "Vui lòng nhập lại mật khẩu",
        "any.only": "Mật khẩu nhập lại không khớp",
        "any.required": "Vui lòng nhập lại mật khẩu",
      }),
  });

  const { error } = schema.validate(data);

  if (error) return { message: error.message };
};
