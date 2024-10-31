import { providerService } from '../service/providerService.js';

class ProviderController {
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
      console.error(error);
      return error.code === 'P2002'
        ? res.status(409).json({ message: 'Provider already registered' })
        : res.status(500).json({ message: 'Error creating the provider' });
    }
  }

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

  async getProviderById(req, res) {
    const userId = req.user.id;
    const providerId = req.params.id;

    try {
      const provider = await providerService.getProviderById(
        userId,
        providerId
      );

      return !provider
        ? res.status(404).json({ message: 'Provider not found' })
        : res.status(200).json(provider);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving the provider' });
    }
  }

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
      switch (error.code) {
        case 'P2025':
          return res.status(404).json({ message: 'Provider not found' });
        case 'P2002':
          const conflictField = error.meta.target;
          return res
            .status(409)
            .json({ message: `${conflictField} is already in use` });
        default:
          return res
            .status(500)
            .json({ message: 'Error updating the provider' });
      }
    }
  }

  async deleteProvider(req, res) {
    const providerId = req.params.id;
    const userId = req.user.id;

    try {
      await providerService.deleteProvider(userId, providerId);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return error.code === 'P2025'
        ? res.status(404).json({ message: 'Provider not found' })
        : res.status(500).json({ message: 'Error deleting the provider' });
    }
  }
}

const providerController = new ProviderController();
export { providerController };
