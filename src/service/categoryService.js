import { prisma } from '../config/database.js';

class CategoryService {
  // Crear una categoría
  async createCategory(userId, name, description) {
    return await prisma.category.create({
      data: {
        name,
        description,
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  }

  // Obtener todas las categorías
  async getAllCategories(userId) {
    return await prisma.category.findMany({
      where: {
        user: { id: userId }
      },
      include: { products: true }
    });
  }

  // Obtener una categoría por ID
  async getCategoryById(categoryId, userId) {
    return await prisma.category.findUnique({
      where: { 
        id: Number(categoryId),
        user: { id: userId }
      },
      include: { products: true }
    });
  }

  // Actualizar una categoría
  async updateCategory(userId, categoyId, data) {
    return await prisma.category.update({
      where: { 
        id: Number(categoyId),
        userId
      },
      data: {
        name: data.name,
        description: data.description
      }
    });
  }

  // Eliminar una categoría
  async deleteCategory(categoyId, userId) {
    return await prisma.category.delete({
      where: { 
        id: Number(categoyId),
        userId
      }
    });
  }
}

const categoryService = new CategoryService();
export { categoryService };
