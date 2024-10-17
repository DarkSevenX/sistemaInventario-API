import { prisma } from '../config/database.js';

class VentaService {
  // Crear una nueva venta asociada a un usuario
  async createVenta(userId, productId, cantidad) {
    try {
      // Buscar el producto para obtener su precio
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
          userId
        }
      });

      if (!product) {
        throw new Error('Product not found');
      }

      // Calcular el precio total
      const totalPrice = product.price * cantidad;

      // Crear la venta, asociándola con el usuario
      const venta = await prisma.venta.create({
        data: {
          user: { connect: { id: userId } }, // Asociar venta con el usuario
          product: { connect: { id: productId } },
          cantidad,
          totalPrice,
          fecha
        }
      });

      return venta;
    } catch (error) {
      console.error('Error creating venta:', error);
      throw error;
    }
  }

  // Obtener todas las ventas de un usuario
  async getVentasByUser(userId) {
    try {
      const ventas = await prisma.venta.findMany({
        where: { id: userId },
        include: {
          product: true, // Incluir información del producto
          user: true // Incluir información del usuario
        }
      });
      return ventas;
    } catch (error) {
      console.error('Error fetching ventas for user:', error);
      throw error;
    }
  }

  // Obtener una venta por ID asociada a un usuario
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

  // Actualizar una venta (solo si pertenece al usuario)
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

  // Eliminar una venta (solo si pertenece al usuario)
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
