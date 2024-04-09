import Joi from "joi";

export const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    thumb: Joi.string().required(),
    price: Joi.number().required(),
    old_price: Joi.number().required(),
    description: Joi.string().required(),
    cate_id: Joi.string().required(),
    chapters: Joi.array().items(Joi.string().required()),
    isPublic: Joi.boolean().default(false),
  });

  return schema.validate(course);
};

export default validateCourse;
