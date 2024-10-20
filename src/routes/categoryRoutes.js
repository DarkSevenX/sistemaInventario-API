import { Router } from 'express';
import { categoryController } from '../controller/categoryController.js';
import { auth } from './authRoutes.js';
import { validate } from '../middleware/validator.js';
import {
  categorySchema,
  updateCategorySchema
} from '../schemas/categorySchema.js';

const router = Router();
router.use(auth.protect());

router
  .post('/', validate(categorySchema), categoryController.createCategory)
  .get('/', categoryController.getAllCategories)
  .get('/:id', categoryController.getCategoryById)
  .patch(
    '/:id',
    validate(updateCategorySchema),
    categoryController.updateCategory
  )
  .delete('/:id', categoryController.deleteCategory);

export default router;
