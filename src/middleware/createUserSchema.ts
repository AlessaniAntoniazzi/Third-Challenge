import Joi from "joi";

export const createUserSchema = Joi.object({
  firstName: Joi.string().min(5).required(),
  lastName: Joi.string().min(5).required(),
  birthDate: Joi.date().iso().required(),
  city: Joi.string().required(),
  country: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
  .min(8)
  .required()
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});

export const validatePassword = (password: string) => {
    return createUserSchema.validate({ password });
  };

  