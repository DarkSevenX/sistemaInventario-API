import { categoryService } from "../service/categoryService.js";

class CategoryController {
  // Crear una categoría
  async createCategory(req, res) {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating category" });
    }
  }

  // Obtener todas las categorías
  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting categories" });
    }
  }

  
  // Obtener una categoría por ID
  async getCategoryById(req, res) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting category" });
    }
  }

  // Actualizar una categoría
  async updateCategory(req, res) {
    try {
      const category = await categoryService.updateCategory(
        req.params.id,
        req.body
      );
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating category" });
    }
  }

  // Eliminar una categoría
  async deleteCategory(req, res) {
    try {
      const category = await categoryService.deleteCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      console.log(req.params.id)
      res.status(500).json({ message: "Error deleting category" });
    }
  }
}

const categoryController = new CategoryController();
export { categoryController };
