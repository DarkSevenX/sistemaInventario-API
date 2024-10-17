import { ventaService } from '../service/ventaService.js';

class VentaController {
  // nueva venta
  async createVenta(req,res) {
    const { productId, cantidad } = req.body
    const userId = req.user.id

    try {
      const venta = await ventaService.createVenta(userId, productId, cantidad);
      res.status(201).json({ venta });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creando la venta' });
    }
  }

  // obtener todas las ventas de un usuario
  async getVentasByUser(req,res) {
    const userId = req.user.id

    try {
      const ventas = await ventaService.getVentasByUser(userId);
      res.status(200).json({ ventas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error obteniendo las ventas' });
    }
  }
}

const ventaController = new VentaController()

export { ventaController }
