import { productService } from '../service/productService.js';
import { categoryService } from '../service/categoryService.js';
import { providerService } from '../service/providerService.js';

class ProductController {
  async createProduct(req, res) {
    const { name, price, stock, categoryId, providerId } = req.body;
    const userId = req.user.id;

    try {
      const [category, provider] = await Promise.all([
        categoryService.getCategoryById(categoryId, userId),
        providerService.getProviderById(userId, providerId)
      ]);

      if (!category || !provider) {
        return res.status(404).json({
          message: !category
            ? 'Categoría no encontrada'
            : 'Proveedor no encontrado'
        });
      }

      const product = await productService.createProduct(
        userId,
        name,
        price,
        stock,
        categoryId,
        providerId
      );

      return res.status(201).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creando el producto' });
    }
  }

  async getAllProducts(req, res) {
    const userId = req.user.id;

    try {
      const products = await productService.getAllProducts(userId);
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: 'Error obteniendo los productos' });
    }
  }

  async getProductById(req, res) {
    const productId = req.params.id;
    const userId = req.user.id;

    try {
      const product = await productService.getProductById(userId, productId);

      return !product
        ? res.status(404).json({ message: 'Producto no encontrado' })
        : res.status(200).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error obteniendo el producto' });
    }
  }

  async updateProduct(req, res) {
    const userId = req.user.id;
    const productId = req.params.id;
    const data = req.body;

    try {
      const updatedProduct = await productService.updateProduct(
        userId,
        productId,
        data
      );

      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return error.code === 'P2025'
        ? res.status(404).json({ message: 'Producto no encontrado' })
        : res.status(500).json({ message: 'Error actualizando el producto' });
    }
  }

  async deleteProduct(req, res) {
    const productId = req.params.id;
    const userId = req.user.id;

    try {
      await productService.deleteProduct(userId, productId);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return error.code === 'P2025'
        ? res.status(404).json({ message: 'Producto no encontrado' })
        : res.status(500).json({ message: 'Error eliminando el producto' });
    }
  }
}

const productController = new ProductController();
export { productController };
