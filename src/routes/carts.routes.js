import { Router } from "express";
import cartModel from "../models/carts.model.js";
import productModel from "../models/products.model.js";

const routerCart = Router();

routerCart.post("/", async (req, res) => {
  try {
    const respuesta = await cartModel.create(req.body);
    res.status(200).send({ resultado: "OK", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al crear producto: ${error}` });
  }
 
});
routerCart.get("/", async (req, res) => {
  try {
    const carts = await cartModel.find();
    res.status(200).send(carts);
  } catch (error) {
    res.status(400).send("Carrito no existe");
  }
});

routerCart.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;

    const cart = await cartModel.findOne({ _id: cid });
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send("Carrito no existe");
  }
});

routerCart.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartModel.findOne({ _id: cid });
    if (!cart) return res.status(404).send("Cart not found");
    const product = await productModel.findOne({ _id: pid });
    if (!product) return res.status(404).send("Product not found");
    const productExist = cart.products.find((prod) => prod.id_prod == pid);
    productExist
      ? productExist.quantity++
      : cart.products.push({ id_prod: product.id, quantity: 1 });
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(400).send({ error: `Error al agregar producto: ${error}` });
  }
});


routerCart.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      const indice = cart.products.findIndex((prod) => prod.id_prod == pid);
      if (indice != -1) {
        cart.products.splice(indice, 1);
        await cart.save();
        res.status(200).send({
          respuesta: "OK",
          mensaje: `El Producto id: ${pid} del carrito id: ${cid} fue eliminado correctamente`,
        });
      } else {
        res.status(404).send({ resultado: "Product Not Found", message: cart });
      }
    } else {
      res.status(404).send({ resultado: "Cart Not Found", message: error });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al eliminar producto: ${error}` });
  }
});

routerCart.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      cart.products = [];
      await cart.save();
      res.status(200).send({
        respuesta: "OK",
        mensaje: `Productos fue eliminados correctamente`,
      });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al eliminar producto: ${error}` });
  }
});
export default routerCart;
