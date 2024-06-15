import { Router } from "express";
import { passportError, authorization } from "../utils/errorMessages.js";
import * as productController from "../controllers/product.controller.js"
const productsRouter = Router();


productsRouter.get("/", productController.getProducts );
productsRouter.get("/:id", productController.getProductById);
productsRouter.post("/",passportError("jwt"),authorization("admin"), productController.addProduct);
productsRouter.put("/:id",productController.updateProduct);
productsRouter.delete("/:id", productController.deleteProduct);
productsRouter.post("/mockingproducts",passportError("jwt"),authorization("admin"), productController.mockingProducts)
export default productsRouter;
