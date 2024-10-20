import { prisma } from '../config/database.js';

class CategoryService {
  /**
   * Crea una categoría en la base de datos.
   * @param {number} userId - ID del usuario que creó la categoría.
   * @param {string} name - Nombre de la categoría.
   * @param {string} description - Descripción de la categoría.
   * @returns [Promise<object>] - La categoría creada.
   */
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

  /**
   * Obtiene todas las categorías asociadas con los productos de un usuario.
   * @param {number} userId - ID del usuario.
   * @returns {Promise<object[]>} - Lista de categorías asociadas con los productos del usuario.
   */

  async getAllCategories(userId) {
    return await prisma.category.findMany({
      where: {
        user: { id: userId }
      },
      include: { products: true }
    });
  }

  /**
   * Obtiene una categoría específica asociada con los productos de un usuario.
   * @param {number} categoryId - ID de la categoría.
   * @param {number} userId - ID del usuario.
   * @returns {Promise<object>} - La categoría específica asociada con los productos del usuario.
   */
  async getCategoryById(categoryId, userId) {
    return await prisma.category.findUnique({
      where: {
        id: Number(categoryId),
        user: { id: userId }
      },
      include: { products: true }
    });
  }

  /**
   * Actualiza una categoría.
   * @param {number} userId - ID del usuario que actualiza la categoría.
   * @param {number} categoyId - ID de la categoría.
   * @param {object} data - Los nuevos valores de la categoría.
   * @returns {Promise<object>} - La categoría actualizada.
   */
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

  /**
   * Elimina una categoría.
   * @param {number} categoyId - ID de la categoría.
   * @param {number} userId - ID del usuario que elimina la categoría.
   * @returns {Promise} - La categoría eliminada.
   */
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
