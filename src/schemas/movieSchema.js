import Joi from "joi";

export const movieSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": 'Trường "title" không được để trống',
    "any.required": 'Trường "title" là bắt buộc',
  }),
  genres: Joi.string().required().messages({
    "string.empty": 'Trường "genres" không được để trống',
    "any.required": 'Trường "genres" là bắt buộc',
  }),
  casts: Joi.array().min(1).required().messages({
    "string.empty": 'Trường "casts" không được để trống',
    "any.required": 'Trường "casts" là bắt buộc',
  }),
  year: Joi.number().integer().required().messages({
    "number.empty": 'Trường "year" không được để trống',
    "any.required": 'Trường "year" là bắt buộc',
  }),
});

export const updateMovieSchema = Joi.object({
  title: Joi.string(),
  genres: Joi.string(),
  casts: Joi.array(),
  year: Joi.number().integer(),
});
