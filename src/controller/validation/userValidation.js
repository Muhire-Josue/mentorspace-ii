import Joi from 'joi';

const userSchema = Joi.object().keys({
  userId: Joi.number().required(),
  email: Joi.string().email().required(),
  firstname: Joi.string().alphanum().min(2).required(),
  lastname: Joi.string().alphanum().min(2).required(),
  password: Joi.string().required(),
  bio: Joi.string().min(2).required(),
  address: Joi.string().min(2).required(),
  occupation: Joi.string().min(2).required(),
  expertise: Joi.string().min(2).required(),
  status: Joi.string().min(2).required(),
 
});

export default userSchema;