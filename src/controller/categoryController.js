import { categoryService } from '../service/categoryService.js';

class CategoryController {
  async createCategory(req, res) {
    const { name, description } = req.body;
    const userId = req.user.id;

    try {
      const category = await categoryService.createCategory(
        userId,
        name,
        description
      );
      return res.status(201).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating category' });
    }
  }

  async getAllCategories(req, res) {
    const userId = req.user.id;

    try {
      const categories = await categoryService.getAllCategories(userId);
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error getting categories' });
    }
  }

  async getCategoryById(req, res) {
    const userId = req.user.id;
    const categoryId = req.params.id;

    try {
      const category = await categoryService.getCategoryById(
        categoryId,
        userId
      );

      return !category
        ? res.status(404).json({ message: 'Category not found' })
        : res.status(200).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error getting category' });
    }
  }

  async updateCategory(req, res) {
    const categoryId = req.params.id;
    const userId = req.user.id;

    try {
      const category = await categoryService.updateCategory(
        userId,
        categoryId,
        req.body
      );

      return res.json(category);
    } catch (error) {
      console.log(error);
      return error.code === 'P2025'
        ? res.status(404).json({ message: 'Category not found' })
        : res.status(500).json({ message: 'Error updating category' });
    }
  }

  async deleteCategory(req, res) {
    const userId = req.user.id;
    const categoryId = req.params.id;

    try {
      await categoryService.deleteCategory(categoryId, userId);
      res.status(204).send();
    } catch (error) {
      console.log(error);
      return error.code === 'P2025'
        ? res.status(404).json({ message: 'Category not found' })
        : res.status(500).json({ message: 'Error deleting category' });
    }
  }
}

const categoryController = new CategoryController();
export { categoryController };
