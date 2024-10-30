import { providerService } from '../service/providerService.js';

class ProviderController {
  // crear un proveedor
  async createProvider(req, res) {
    const { name, contact, email } = req.body;
    const userId = req.user.id;

    try {
      const provider = await providerService.createProvider(
        userId,
        name,
        contact,
        email
      );

      return res.status(201).json(provider);
    } catch (error) {
      if (error.code === 'P2002') {
        return res.status(409).json({ message: 'Provider already registered' });
      }
      console.error(error);
      return res.status(500).json({ message: 'Error creating the provider' });
    }
  }

  // Obtener todos los proveedores
  async getAllProviders(req, res) {
    const userId = req.user.id;

    try {
      const providers = await providerService.getAllProviders(userId);
      return res.status(200).json(providers);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Error retrieving the providers' });
    }
  }

  // Obtener un proveedor por ID
  async getProviderById(req, res) {
    const userId = req.user.id;
    const providerId = req.params.id;

    try {
      const provider = await providerService.getProviderById(
        userId,
        providerId
      );

      if (!provider) {
        return res.status(404).json({ message: 'Provider not found' });
      }

      return res.status(200).json(provider);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving the provider' });
    }
  }

  // Actualizar un proveedor
  async updateProvider(req, res) {
    const userId = req.user.id;
    const providerId = req.params.id;
    const data = req.body;

    try {
      const updatedProvider = await providerService.updateProvider(
        userId,
        providerId,
        data
      );

      return res.status(200).json(updatedProvider);
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Provider not found' });
      }
      else if (error.code === 'P2002') {
        const conflictField = error.meta.target 
        return res.status(409).json({ message: `${conflictField} is already in use` })
      }

      console.error(error);
      return res.status(500).json({ message: 'Error updating the provider' });
    }
  }

  // Eliminar un proveedor
  async deleteProvider(req, res) {
    const providerId = req.params.id;
    const userId = req.user.id;

    try {
      await providerService.deleteProvider(userId, providerId);

      return res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Provider not found' });
      }

      console.error(error);
      return res.status(500).json({ message: 'Error deleting the provider' });
    }
  }
}

const providerController = new ProviderController();
export { providerController };
