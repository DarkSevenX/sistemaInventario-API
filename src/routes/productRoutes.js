import { Router } from 'express';
import { productController } from '../controller/productController.js';
import { validate } from '../middleware/validator.js';
import { auth } from './authRoutes.js';
import {
  productSchema,
  updateProductSchema
} from '../schemas/productSchema.js';

const router = Router();
router.use(auth.protect());

router
  .post('/', validate(productSchema), productController.createProduct)

  .get('/', productController.getAllProducts)

  .get('/:id', productController.getProductById)

  .patch('/:id', validate(updateProductSchema), productController.updateProduct)

  .delete('/:id', productController.deleteProduct);

export default router;
