import {Router} from "express";
import { productController } from "../controller/productController.js";

const router = Router()

router
  .post('/', productController.createProduct)
  .get('/', productController.getAllProducts)
  .get('/:id', productController.getProductById)
  .patch('/:id', productController.updateProduct)
  .delete('/:id', productController.deleteProduct)

export default router
