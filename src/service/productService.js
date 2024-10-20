import { prisma } from '../config/database.js';

class ProductService {
  /**
   * Crea un producto en la base de datos.
   * @param {number} userId - ID del usuario que creó el producto.
   * @param {string} name - Nombre del producto.
   * @param {number} price - Precio del producto.
   * @param {number} stock - Stock del producto.
   * @param {number} categoryId - ID de la categoría del producto.
   * @param {number} supplierId - ID del proveedor del producto.
   * @returns {object} - El producto creado.
   */
  async createProduct(userId, name, price, stock, categoryId, supplierId) {
    return await prisma.product.create({
      data: {
        name,
        price,
        stock,
        category: {
          connect: { id: Number(categoryId) }
        },
        provider: {
          connect: { id: Number(supplierId) }
        },
        user: {
          connect: { id: Number(userId) }
        }
      }
    });
  }

  /**
   * Obtiene todos los productos asociados con las categorías y proveedores de un usuario.
   * @param {number} userId - ID del usuario.
   * @returns {Promise<object[]>} - Lista de productos asociados con las categorías y proveedores del usuario.
   */
  async getAllProducts(userId) {
    return await prisma.product.findMany({
      where: { userId: Number(userId) },
      include: {
        category: true,
        provider: true
      }
    });
  }

  /**
   * Obtiene un producto por ID.
   * @param {number} userId - ID del usuario.
   * @param {number} productId - ID del producto.
   * @returns {Promise<object>} - El producto solicitado.
   */
  async getProductById(userId, productId) {
    return await prisma.product.findUnique({
      where: {
        id: Number(productId),
        userId
      },
      include: {
        category: true,
        provider: true
      }
    });
  }

  /**
   * Actualiza un producto.
   * @param {number} userId - ID del usuario que actualiza el producto.
   * @param {number} productId - ID del producto.
   * @param {object} data - Los nuevos valores del producto.
   * @returns {Promise<object>} - El producto actualizado.
   */
  async updateProduct(userId, productId, data) {
    return await prisma.product.update({
      where: {
        id: Number(productId),
        userId
      },
      data: {
        name: data.name,
        categoryId: data.categoryId,
        providerId: data.providerId,
        price: data.price,
        stock: data.stock
      }
    });
  }

  /**
   *Eliminar un producto
   * @param {number} userId - ID del usuario.
   * @param {number} productId - ID del producto.
   * @returns {Promise} - El producto eliminado.
   */
  async deleteProduct(userId, productId) {
    return await prisma.product.delete({
      where: {
        id: Number(productId),
        userId
      }
    });
  }
}

const productService = new ProductService();
export { productService };
