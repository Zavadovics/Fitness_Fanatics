import Joi from 'joi';

export const cityValidation = data => {
  const schema = Joi.object({
    name: Joi.number().min(1).required(),
    value: Joi.string().min(1).required(),
  });
  return schema.validate(data);
};
