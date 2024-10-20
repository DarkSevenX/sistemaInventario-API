import { prisma } from '../config/database.js';
import { productService } from './productService.js';

class VentaService {
  /**
   * Crea una nueva venta en la base de datos.
   * @param {number} userId - ID del usuario.
   * @param {object} product - Producto vendido.
   * @param {number} quantity - Cantidad vendida del producto.
   * @returns {Promise<object>} - La venta creada.
   */
  async createVenta(userId, product, quantity) {
    const totalPrice = product.price * quantity;

    const updatedProduct = await productService.updateProduct(
      userId,
      product.id,
      {
        stock: product.stock - quantity
      }
    );

    return await prisma.venta.create({
      data: {
        product: {
          connect: { id: product.id }
        },
        quantity,
        totalPrice,
        remainingStock: updatedProduct.stock,
        user: {
          connect: { id: userId }
        }
      }
    });
  }

  /**
    * Obtiene todas las ventas de un usuario.
    * @param {number} userId - ID del usuario.
    * @returns {Promise<Array<object>>} - Las ventas del usuario.
    */
  async getVentasByUser(userId) {
    return await prisma.venta.findMany({
      where: { userId },
      include: {
        product: true, // Incluir información del producto
        user: true // Incluir información del usuario
      }
    });
  }

  /**
    * Obtiene una venta por ID (solo si pertenece al usuario)
    * @param {number} userId - ID del usuario.
    * @param {number} ventaId - ID de la venta.
    * @returns {Promise<object>} - La venta solicitada.
    */
  async getVentaById(userId, ventaId) {
    try {
      const venta = await prisma.venta.findFirst({
        where: { id: ventaId, userId },
        include: { product: true, user: true }
      });

      if (!venta) {
        throw new Error('Venta not found');
      }

      return venta;
    } catch (error) {
      console.error('Error fetching venta by ID:', error);
      throw error;
    }
  }

  /**
    * Actualiza la cantidad y fecha de una venta (solo si pertenece al usuario)
    * @param {number} userId - ID del usuario.
    * @param {number} ventaId - ID de la venta.
    * @param {number} cantidad - Nueva cantidad de la venta.
    * @param {string} fecha - Nueva fecha de la venta (formato 'YYYY-MM-DD').
    * @returns {Promise<object>} - El resultado de la operación.
    */
  async updateVenta(userId, ventaId, cantidad, fecha) {
    try {
      const venta = await prisma.venta.updateMany({
        where: { id: ventaId, userId }, // Verificar que la venta pertenece al usuario
        data: {
          cantidad,
          fecha
        }
      });

      if (venta.count === 0) {
        throw new Error('Venta not found or not owned by the user');
      }

      return venta;
    } catch (error) {
      console.error('Error updating venta:', error);
      throw error;
    }
  }

  /**
    * Elimina una venta de la base de datos (solo si pertenece al usuario)
    * @param {number} userId - ID del usuario.
    * @param {number} ventaId - ID de la venta.
    * @returns {Promise<object>} - El resultado de la operación.
    */
  async deleteVenta(userId, ventaId) {
    try {
      const venta = await prisma.venta.deleteMany({
        where: { id: ventaId, userId } // Verificar que la venta pertenece al usuario
      });

      if (venta.count === 0) {
        throw new Error('Venta not found or not owned by the user');
      }

      return { message: 'Venta deleted successfully' };
    } catch (error) {
      console.error('Error deleting venta:', error);
      throw error;
    }
  }
}

const ventaService = new VentaService();
export { ventaService };
