import Joi from "joi";

export const validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(category);
};

export default validateCategory;
