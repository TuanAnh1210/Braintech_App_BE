import Joi from "joi";

export const genresSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": 'Trường "name" không được để trống',
    "any.required": 'Trường "name" là bắt buộc',
  }),
});

export const updateGenresSchema = Joi.object({
  name: Joi.string(),
});
