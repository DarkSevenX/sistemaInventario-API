import Joi from 'joi';

export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(255).required()
})
  .unknown(true)
  .prefs({ convert: false })

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50),
  description: Joi.string().max(255)
})
  .unknown(true)
  .prefs({ convert: false })
