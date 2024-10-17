import { prisma } from "../config/database.js";

class CategoryService {
  // Crear una categoría
  async createCategory(data) {
    return await prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  // Obtener todas las categorías
  async getAllCategories() {
    return await prisma.category.findMany({
      include: {
        products: true,
      },
    });
  }

  // Obtener una categoría por ID
  async getCategoryById(id) {
    return await prisma.category.findUnique({
      where: { id: Number(id) },
      include: {
        products: true,
      },
    });
  }

  // Actualizar una categoría
  async updateCategory(id, data) {
    return await prisma.category.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  // Eliminar una categoría
  async deleteCategory(id) {
    return await prisma.category.delete({
      where: { id: Number(id) },
    });
  }
}

const categoryService = new CategoryService();
export { categoryService };

