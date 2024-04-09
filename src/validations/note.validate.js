import Joi from "joi";

export const validateNote = (note) => {
  const schema = Joi.object({
    text: Joi.string().required(),
    user_id: Joi.string().required(),
    lesson_id: Joi.string().required(),
  });

  return schema.validate(note);
};

export default validateNote;
