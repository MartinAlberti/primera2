import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";

const cartRoutes = Router();

cartRoutes.post("/", cartController.createCart);
cartRoutes.get("/", cartController.getCarts);
cartRoutes.get("/:cid", cartController.getCartById);
cartRoutes.post("/:cid/product/:pid", cartController.addProductToCart);
cartRoutes.put("/:cid", cartController.updateCart);
cartRoutes.delete(
  "/:cid/product/:pid",
  cartController.deleteProductFromCartById
);
cartRoutes.delete("/:cid", cartController.emptyCart);

export default cartRoutes;
