import Joi from 'joi';

export const providerSchema = Joi.object({
  name: Joi.string().required(),
  contact: Joi.number().strict().required(),
  email: Joi.string().email().required(),
})
  .unknown(true)
  .prefs({ convert: false })

export const updateProviderSchema = Joi.object({
  name: Joi.string(),
  contact: Joi.number().strict(),
  email: Joi.string().email(),
})
  .unknown(true)
  .prefs({ convert: false })
