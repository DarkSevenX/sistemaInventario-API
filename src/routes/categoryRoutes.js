import { Router } from 'express';
import { categoryController } from '../controller/categoryController.js';
import { auth } from './authRoutes.js';
import { validate } from '../middleware/validator.js';
import { categorySchema,updateCategorySchema } from '../schemas/categorySchema.js';
import { isInt } from '../middleware/idIsInt.js';

const router = Router();
router.use(auth.protect());
router.use('/:id', isInt)

router
  .post('/', validate(categorySchema), categoryController.createCategory)

  .get('/', categoryController.getAllCategories)

  .get('/:id', categoryController.getCategoryById)

  .patch('/:id', validate(updateCategorySchema), categoryController.updateCategory)

  .delete('/:id', categoryController.deleteCategory);

export default router;
