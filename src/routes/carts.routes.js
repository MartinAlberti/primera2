import { Router } from "express";
import { CartManager } from "../controllers/cartManager.js";

const routerCart = Router();
const cartManager = new CartManager("./src/models/carts.json");

routerCart.post("/", async (req, res) => {
  const confirmacion = await cartManager.createCart(req.body);
  if (confirmacion) res.status(200).send("Carrito creado correctamente");
  else res.status(400).send("Carrito ya existente");
});


routerCart.get("/:cid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const cart = await cartManager.getCartById(cid);
  cart ? res.status(200).send(cart): res.status(400).send("Carrito no existe");
});

routerCart.post("/:cid/product/:pid", async (req,res)=>{
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const cart = await cartManager.addProductToCart(cid,pid);
  cart ? res.status(200).send(cart): res.status(400).send("Carrito no existe");

})
export default routerCart;
