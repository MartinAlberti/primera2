import { Router } from "express";
import {passportError, authorization} from "../utils/errorMessages.js"
import * as cartController from "../controllers/cart.controller.js";

const cartRoutes = Router();

cartRoutes.post("/", cartController.createCart);
cartRoutes.get("/", cartController.getCarts);
cartRoutes.get("/:cid", cartController.getCartById);
cartRoutes.post("/:cid/product/:pid",passportError("jwt"),authorization("user"), cartController.addProductToCart);
cartRoutes.put(":cid/product/:pid",passportError("jwt"),authorization("user"),cartController.putProductToCart)
cartRoutes.put("/:cid",passportError("jwt"),authorization("user"), cartController.updateCart);
cartRoutes.put(":cid/product/:pid",passportError("jwt"),authorization("user"),cartController.updateQuantity)


cartRoutes.delete("/:cid/product/:pid",cartController.deleteProductFromCartById);
cartRoutes.delete("/:cid", cartController.emptyCart);
cartRoutes.post("/:cid/purchase",passportError("jwt"),authorization("user"), cartController.purchaseCart)

export default cartRoutes;
