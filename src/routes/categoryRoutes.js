import {Router} from "express";
import { categoryController } from "../controller/categoryController.js";

const router = Router()

router
  .post("/", categoryController.createCategory)
  .get("/", categoryController.getAllCategories)
  .get("/:id", categoryController.getCategoryById)
  .patch("/:id", categoryController.updateCategory)
  .delete("/:id", categoryController.deleteCategory);

export default router;
