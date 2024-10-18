import { prisma } from "../config/database.js";

class ProviderService {
  // Crear un proveedor
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

  // Obtener todos los proveedores
  async getAllProviders(userId) {
    return await prisma.provider.findMany({
      where: { userId },
      include: {
        products: true,
      },
    });
  }

  // Obtener un proveedor por ID
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

  // Actualizar un proveedor
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

  // Eliminar un proveedor
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
