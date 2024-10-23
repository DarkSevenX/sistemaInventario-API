import Joi from 'joi';

export const ventaSchema = Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
}).unknown(false)
