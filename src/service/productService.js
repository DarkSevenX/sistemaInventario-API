import { prisma } from '../config/database.js';

class ProductService {
  // Crear un producto
  async createProduct(userId ,name, price, stock, categoryId, supplierId) {
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

  // Obtener todos los productos
  async getAllProducts(userId) {
    return await prisma.product.findMany({
      where: { userId: Number(userId) },
      include: {
        category: true,
        provider: true
      }
    });
  }

  // Obtener un producto por ID
  async getProductById(userId,productId) {
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

  // Actualizar un producto
  async updateProduct(userId, productId, data) {
    return await prisma.product.update({
      where: { 
        id: Number(productId),
        userId: data.userId
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

  // Eliminar un producto
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
