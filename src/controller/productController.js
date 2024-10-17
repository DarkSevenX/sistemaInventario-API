import { productService } from '../service/productService.js';

class ProductController {
  // Crear un producto
  async createProduct(req, res) {
    try {
      const data = req.body;
      const product = await productService.createProduct(data);
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      console.log(req.body);
      res.status(500).json({ message: 'Error creando el producto' });
    }
  }

  // Obtener todos los productos
  async getAllProducts(req, res) {
    try {
      const products = await productService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error obteniendo los productos' });
    }
  }

  // Obtener un producto por ID
  async getProductById(req, res) {
    try {
      const id = req.params.id;
      const product = await productService.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error obteniendo el producto' });
    }
  }

  // Actualizar un producto
  async updateProduct(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedProduct = await productService.updateProduct(id, data);

      res.json(updatedProduct);
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
    try {
      const id = req.params.id;
      const deletedProduct = await productService.deleteProduct(id);

      res.status(204).send();
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
