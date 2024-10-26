import Joi from 'joi';

export const providerSchema = Joi.object({
  name: Joi.string().required(),
  contact: Joi.number().required(),
  email: Joi.string().email().required(),
})
  .unknown(true)
  .prefs({ convert: true })

export const updateProviderSchema = Joi.object({
  name: Joi.string(),
  contact: Joi.number(),
  email: Joi.string().email()
})
  .unknown(true)
  .prefs({ convert: true })
