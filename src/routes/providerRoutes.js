import {Router} from "express";
import { providerController } from "../controller/providerController.js";
import { auth } from "./authRoutes.js";

const router = Router()
router.use(auth.protect())

router
  .post("/", providerController.createProvider)
  .get("/", providerController.getAllProviders)
  .get("/:id", providerController.getProviderById)
  .patch("/:id", providerController.updateProvider)
  .delete("/:id", providerController.deleteProvider);

export default router;
