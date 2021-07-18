import Joi from 'joi';

export const photoValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(1).required(),
    avatar: Joi.string().min(1).required(),
    cloudinary_id: Joi.string().min(1).required(),
  });
  return schema.validate(data);
};
