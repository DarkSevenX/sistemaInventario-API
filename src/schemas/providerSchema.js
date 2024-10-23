import Joi from 'joi';

export const providerSchema = Joi.object({
  name: Joi.string().required(),
  contact: Joi.number().required(),
  email: Joi.string().email().required(),
}).unknown(false)

export const updateProviderSchema = Joi.object({
  name: Joi.string(),
  contact: Joi.string(),
  email: Joi.string().email(),
}).unknown(false)
