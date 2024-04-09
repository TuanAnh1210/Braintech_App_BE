import Joi from "joi";

export const validateStatusCourse = (statusCourse) => {
  const schema = Joi.object({
    course_id: Joi.string().required(),
    user_id: Joi.string().required(),
  });

  return schema.validate(statusCourse);
};

export default validateStatusCourse;
