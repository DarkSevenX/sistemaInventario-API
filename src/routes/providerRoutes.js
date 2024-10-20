import {Router} from "express";
import { providerController } from "../controller/providerController.js";
import { auth } from "./authRoutes.js";
import { validate } from "../middleware/validator.js";
import { providerSchema, updateProviderSchema } from "../schemas/providerSchema.js";
import { isInt } from "../middleware/idIsInt.js";

const router = Router()
router.use(auth.protect())
router.use('/:id', isInt)

router
  .post("/", validate(providerSchema), providerController.createProvider)
  .get("/" ,providerController.getAllProviders)
  .get("/:id", providerController.getProviderById)
  .patch("/:id", validate(updateProviderSchema), providerController.updateProvider)
  .delete("/:id", providerController.deleteProvider);

export default router;
