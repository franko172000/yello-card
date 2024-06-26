import { validate, ValidationError, Joi } from 'express-validation'
export const registerValidation = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        role: Joi.string()
            .valid('admin', 'user')
            .required(),
    }),
}