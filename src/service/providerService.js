import { prisma } from "../config/database.js";

class ProviderService {
  // Crear un proveedor
  async createProvider(data) {
    return await prisma.provider.create({
      data: {
        name: data.name,
        contact: data.contact,
        email: data.email,
      },
    });
  }

  // Obtener todos los proveedores
  async getAllProviders() {
    return await prisma.provider.findMany({
      include: {
        products: true,
      },
    });
  }

  // Obtener un proveedor por ID
  async getProviderById(id) {
    return await prisma.provider.findUnique({
      where: { id: Number(id) },
      include: {
        products: true,
      },
    });
  }

  // Actualizar un proveedor
  async updateProvider(id, data) {
    return await prisma.provider.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        contact: data.contact,
        email: data.email,
      },
    });
  }

  // Eliminar un proveedor
  async deleteProvider(id) {
    return await prisma.provider.delete({
      where: { id: Number(id) },
    });
  }
}

const providerService = new ProviderService()
export { providerService }
