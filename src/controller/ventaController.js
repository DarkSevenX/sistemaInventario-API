import { ventaService } from '../service/ventaService.js';
import { productService } from '../service/productService.js';

class VentaController {
  async createVenta(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
      const product = await productService.getProductById(userId, productId);

      if (!product || product.stock < quantity) {
        return res
          .status(product ? 400 : 404)
          .json({
            error: !product
              ? 'Producto no encontrado'
              : 'No hay stock suficiente'
          });
      }

      const venta = await ventaService.createVenta(userId, product, quantity);
      return res.status(201).json({ venta });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error creando la venta' });
    }
  }

  async getVentasByUser(req, res) {
    const userId = req.user.id;

    try {
      const ventas = await ventaService.getVentasByUser(userId);
      return res.status(200).json(ventas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error obteniendo las ventas' });
    }
  }
}

const ventaController = new VentaController();

export { ventaController };
