import { prisma } from "../config/database.js";

class ProductService {
  // Crear un producto
  async createProduct(data) {
    return await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        stock: data.stock,
        category: {
          connect: { id: Number(data.categoryId) }
        },
        provider: {
          connect: { id: Number(data.supplierId) }
        }
      }
    });
  }

  // Obtener todos los productos
  async getAllProducts() {
    return await prisma.product.findMany({
      include: {
        category: true,
        provider: true
      }
    });
  }

  // Obtener un producto por ID
  async getProductById(id) {
    return await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
        provider: true
      }
    });
  }

  // Actualizar un producto
  async updateProduct(id, data) {
    return await prisma.product.update({
      where: { id: Number(id) },
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
  async deleteProduct(id) {
    return await prisma.product.delete({
      where: { id: Number(id) }
    });
  }
}

const productService = new ProductService();
export { productService };
