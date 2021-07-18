import Joi from 'joi';

export const activityValidation = data => {
  const schema = Joi.object({
    activityDate: Joi.date().min(1).required(),
    activityTime: Joi.string().min(1).required(),
    duration: Joi.number().min(1).required(),
    activityType: Joi.string().min(1).required(),
    distance: Joi.number().min(1).required(),
    comment: Joi.string().min(1).required(),
    photoUrl: Joi.string().min(1).required(),
  });
  return schema.validate(data);
};
