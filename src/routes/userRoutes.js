import {Router} from "express";
import { auth } from "./authRoutes.js";
import { userController } from "../controller/userController.js";

const router = Router()
router.use(auth.protect())

router
  .get('/', userController.getUser)
  .patch('/', userController.updateUser)
  .delete('/', userController.deleteUser)

export default router
