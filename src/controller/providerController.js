import { providerService } from "../service/providerService.js";

class ProviderController {
  // crear un proveedor
  async createProvider(req, res) {
    try {
      const data = req.body;
      const provider = await providerService.createProvider(data);
      res.status(201).json(provider);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating the provider" });
    }
  }

  // Obtener todos los proveedores
  async getAllProviders(req, res) {
    try {
      const providers = await providerService.getAllProviders();
      res.json(providers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving the providers" });
    }
  }

  // Obtener un proveedor por ID
  async getProviderById(req, res) {
    try {
      const id = req.params.id;
      const provider = await providerService.getProviderById(id);
      if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
      }
      res.json(provider);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving the provider" });
    }
  }

  // Actualizar un proveedor
  async updateProvider(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedProvider = await providerService.updateProvider(id, data);
      if (!updatedProvider) {
        return res.status(404).json({ message: "Provider not found" });
      }
      res.json(updatedProvider);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating the provider" });
    }
  }

  // Eliminar un proveedor
  async deleteProvider(req, res) {
    try {
      const id = req.params.id;
      const deletedProvider = await providerService.deleteProvider(id);
      if (!deletedProvider) {
        return res.status(404).json({ message: "Provider not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting the provider" });
    }
  }

}

const providerController = new ProviderController();
export { providerController };
