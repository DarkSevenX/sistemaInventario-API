import { Router } from 'express';
import { ventaController } from '../controller/ventaController.js';
import { auth } from './authRoutes.js';

const router = Router();
router.use(auth.protect())

router
  .get('/', ventaController.getVentasByUser)
  .post('/', ventaController.createVenta)

export default router;
