import Joi from "joi";

export const validateComment = (comment) => {
  const schema = Joi.object({
    text: Joi.string().required(),
    user_id: Joi.string().required(),
    lesson_id: Joi.string().required(),
  });

  return schema.validate(comment);
};

export default validateComment;
