import { Router } from 'express';
import { productController } from '../controller/productController.js';
import { auth } from './authRoutes.js';

const router = Router();
router.use(auth.protect());

router
  .post('/', productController.createProduct)
  .get('/', productController.getAllProducts)
  .get('/:id', productController.getProductById)
  .patch('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct);

export default router;
