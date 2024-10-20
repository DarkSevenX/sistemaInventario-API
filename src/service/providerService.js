// @ts-check
import { prisma } from "../config/database.js";

class ProviderService {
  /**
    * Crear un proveedor en la base de datos.
    * @param {number} userId - ID del usuario que creó el proveedor.
    * @param {string} name - Nombre del proveedor.
    * @param {number} contact - Contacto del proveedor.
    * @param {string} email - Email del proveedor.
    * @returns {Promise<object>} - El proveedor creado.
  */
  async createProvider(userId ,name, contact, email) {
    return await prisma.provider.create({
      data: {
        name,
        contact,
        email,
        user: { connect: { id: userId } },
      },
    });
  }

  /**
    * Obtener todos los proveedores asociados con los productos de un usuario.
    * @param {number} userId - ID del usuario.
    * @returns {Promise<object[]>} - Lista de proveedores asociados con los productos del usuario.
  */
  async getAllProviders(userId) {
    return await prisma.provider.findMany({
      where: { userId },
      include: {
        products: true,
      },
    });
  }

  /**
    * Obtener un proveedor específico asociado con los productos de un usuario.
    * @param {number} userId - ID del usuario.
    * @param {number} providerId - ID del proveedor.
    * @returns {Promise<object>} - El proveedor específico asociado con los productos del usuario.
  */
  async getProviderById(userId,providerId) {
    return await prisma.provider.findUnique({
      where: { 
        id: Number(providerId),
        userId,
      },
      include: {
        products: true,
      },
    });
  }

  /**
    * Actualizar un proveedor.
    * @param {number} userId - ID del usuario que actualiza el proveedor.
    * @param {number} providerId - ID del proveedor.
    * @param {object} data - Los nuevos valores del proveedor.
    * @returns {Promise} - El proveedor actualizado.
  */
  async updateProvider(userId, providerId, data) {
    return await prisma.provider.update({
      where: { 
        id: Number(providerId),
        userId
      },
      data: {
        name: data.name,
        contact: data.contact,
        email: data.email,
      },
    });
  }

  /**
    * Eliminar un proveedor
    * @param {number} userId - ID del usuario.
    * @param {number} providerId - ID del proveedor.
    * @returns {Promise} - El proveedor eliminado.
  */
  async deleteProvider(userId, providerId) {
    return await prisma.provider.delete({
      where: { 
        id: Number(providerId),
        userId,
      },
    });
  }
}

const providerService = new ProviderService()
export { providerService }
