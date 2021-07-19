import Joi from 'joi';

export const activityValidation = data => {
  const schema = Joi.object({
    user_id: Joi.string().min(1).required(),
    activityDate: Joi.date().min(1).required(),
    activityTime: Joi.string().min(1).required(),
    duration: Joi.number().min(1).required(),
    activityType: Joi.string().min(1).required(),
    distance: Joi.number().min(1).required(),
    comment: Joi.string().min(1).required(),
  });
  return schema.validate(data);
};
