import Joi from "joi";

export const validateChapter = (chapter) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    course_id: Joi.string().required(),
    lessons: Joi.array().items(Joi.string().required()),
  });

  return schema.validate(chapter);
};

export default validateChapter;
