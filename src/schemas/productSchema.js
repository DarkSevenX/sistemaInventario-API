import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  categoryId: Joi.number().required(),
  supplierId: Joi.number().required()
})

export const updateProductSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number(),
  stock: Joi.number(),
  categoryId: Joi.number(),
  supplierId: Joi.number()
})
