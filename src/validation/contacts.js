import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username should be a string",
    "string.min": "Username should have at least {#limit} characters",
    "string.max": "Username should have at most {#limit} characters",
    "any.required": "Username is required",
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must follow the format +380XXXXXXXXX.",
      "any.required": 'The "phone number" field is required.',
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "any.required": 'The "email" field is required.',
  }),
  isFavourite: Joi.boolean().required().messages({
    "boolean.base": 'The "isFavourite" field must be a boolean value.',
    "any.required": 'The "isFavourite" field is required.',
  }),
  contactType: Joi.string()
    .valid("personal", "work", "other")
    .required()
    .messages({
      "any.only":
        "The contact type must be one of the following: personal, work, other.",
      "any.required": 'The "contact type" field is required.',
    }),
  userId: Joi.string(), // нова властивість
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).messages({
    "string.base": "Username should be a string",
    "string.min": "Username should have at least {#limit} characters",
    "string.max": "Username should have at most {#limit} characters",
    "any.required": "Username is required",
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .messages({
      "string.pattern.base":
        "Phone number must follow the format +380XXXXXXXXX.",
      "any.required": 'The "phone number" field is required.',
    }),
  email: Joi.string().email().messages({
    "string.email": "Invalid email format.",
    "any.required": 'The "email" field is required.',
  }),
  isFavourite: Joi.boolean().messages({
    "boolean.base": 'The "isFavourite" field must be a boolean value.',
    "any.required": 'The "isFavourite" field is required.',
  }),
  contactType: Joi.string().valid("personal", "work", "other").messages({
    "any.only":
      "The contact type must be one of the following: personal, work, other.",
    "any.required": 'The "contact type" field is required.',
  }),
});
