import Joi from "joi";

export const castSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": 'Trường "name" không được để trống',
    "any.required": 'Trường "name" là bắt buộc',
  }),
  birthday: Joi.number().required().messages({
    "number.empty": 'Trường "birthday" không được để trống',
    "any.required": 'Trường "birthday" là bắt buộc',
  }),
});

export const updateCastSchema = Joi.object({
  name: Joi.string(),
  birthday: Joi.number().integer(),
});
