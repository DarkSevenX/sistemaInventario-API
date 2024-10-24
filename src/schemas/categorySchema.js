import Joi from 'joi';

export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(10).max(255).required()
})
  .prefs({ convert: false })

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(50),
  description: Joi.string().min(10).max(255)
})
  .prefs({ convert: false })
