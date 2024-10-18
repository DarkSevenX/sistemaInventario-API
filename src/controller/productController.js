import { productService } from '../service/productService.js';
import { categoryService } from '../service/categoryService.js';
import { providerService } from '../service/providerService.js';

class ProductController {
  // Crear un producto
  async createProduct(req, res) {
    const { name, price, stock, categoryId, supplierId } = req.body;
    const userId = req.user.id;

    try {
      const category = await categoryService.getCategoryById(
        categoryId,
        userId
      );
      const provider = await providerService.getProviderById(
        userId,
        supplierId
      );

      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      if (!provider) {
        return res.status(404).json({ message: 'Proveedor no encontrado' });
      }

      const product = await productService.createProduct(
        userId,
        name,
        price,
        stock,
        categoryId,
        supplierId
      );

      return res.status(201).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creando el producto' });
    }
  }

  // Obtener todos los productos
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts(userId);
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error obteniendo los productos' });
    }
  }

  // Obtener un producto por ID
  async getProductById(req, res) {
    const productId = req.params.id;
    const userId = req.user.id;

    try {
      const product = await productService.getProductById(userId, productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error obteniendo el producto' });
    }
  }

  // Actualizar un producto
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
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      console.error(error);
      return res
        .status(500)
        .json({ message: 'Error actualizando el producto' });
    }
  }

  // Eliminar un producto
  async deleteProduct(req, res) {
    const productId = req.params.id;
    const userId = req.user.id;

    try {
      await productService.deleteProduct(userId, productId);
      return res.status(204).send();
    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      console.error(error);
      return res.status(500).json({ message: 'Error eliminando el producto' });
    }
  }
}

const productController = new ProductController();
export { productController };
