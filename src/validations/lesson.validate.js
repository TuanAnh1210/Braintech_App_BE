import Joi from "joi";

export const validateLesson = (lesson) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    pathVideo: Joi.string().required(),
    chapter_id: Joi.string().required(),
  });

  return schema.validate(lesson);
};

export default validateLesson;
