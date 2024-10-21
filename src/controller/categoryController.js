import { categoryService } from '../service/categoryService.js';

class CategoryController {
  // Crear una categoría
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

  // Obtener todas las categorías
  async getAllCategories(req, res) {
    const userId = req.user.id;

    try {
      const categories = await categoryService.getAllCategories(userId);
      return res.status().json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error getting categories' });
    }
  }

  // Obtener una categoría por ID
  async getCategoryById(req, res) {
    const userId = req.user.id;
    const categoryId = req.params.id;

    try {
      const category = await categoryService.getCategoryById(
        categoryId,
        userId
      );

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      return res.status(200).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error getting category' });
    }
  }

  // Actualizar una categoría
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
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Category not found' });
      }
      console.error(error);
      return res.status(500).json({ message: 'Error updating category' });
    }
  }

  // Eliminar una categoría
  async deleteCategory(req, res) {
    const userId = req.user.id;
    const categoryId = req.params.id;

    try {
      const category = await categoryService.deleteCategory(categoryId, userId);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Category not found' });
      }
      console.error(error);
      return res.status(500).json({ message: 'Error deleting category' });
    }
  }
}

const categoryController = new CategoryController();
export { categoryController };
