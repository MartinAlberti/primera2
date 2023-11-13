import cartModel from "../models/carts.model.js";
import userModel from "../models/users.model.js";
import productModel from "../models/products.model.js";
import ticketModel from "../models/ticket.model.js";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger.js";

export const createCart = async (req, res) => {
  try {
    const respuesta = await cartModel.create(req.body);
    res.status(200).send({ resultado: "OK", message: respuesta });
  } catch (error) {
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    res.status(400).send({ error: `Error al crear producto: ${error}` });
  }
};

export const getCarts = async (req, res) => {
  try {
    const carts = await cartModel.find();
    res.status(200).send({ resultado: "OK", message: carts });
  } catch (error) {
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    res.status(400).send({ error: `"Carrito no existe": ${error}` });
  }
};
export const getCartById = async (req, res) => {
  try {
    const cid = req.params.cid;

    const cart = await cartModel.findOne({ _id: cid });
    res.status(200).send({ resultado: "OK", message: cart });
  } catch (error) {
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    res.status(400).send({ error: `"Carrito no existe": ${error}` });
  }
};
export const addProductToCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).send("Cart not found");
    const product = await productModel.findById(pid);
    if (!product) return res.status(404).send("Product not found");
    const productExist = cart.products.find((prod) => prod.id_prod._id == pid);
    productExist
      ? productExist.quantity++
      : cart.products.push({ id_prod: product.id, quantity: 1 });
    await cart.save();
    res.status(200).send({
      resultado: "OK",
      message: `Producto agregado, ${cart}`,
    });
  } catch (error) {
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    res.status(400).send({ error: `Error al agregar producto: ${error}` });
  }
};
export const updateCart = async (req, res) => {
  const { cid } = req.params;
  const putprod = req.body;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      putprod.forEach((product) => {
        const prod = cart.products.find(
          (cartProd) => cartProd.id_prod._id == product.id_prod
        );
        if (prod) {
          prod.quantity += product.quantity;
        } else {
          cart.products.push(product);
        }
      });
      await cart.save();
      res
        .status(200)
        .send({ resultado: "OK", message: `Carrito actualizado ${cart}` });
    } else {
      res.status(404).send({ resultado: "Cart Not Found", message: error });
    }
  } catch (error) {
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    res.status(400).send({ error: `Error al agregar productos: ${error}` });
  }
};

export const putProductToCart = async (req, res) => {
  // agregar producto al carrito
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    const product = await productModel.findById(pid);

    if (!product) {
      res
        .status(404)
        .send({ resultado: "Product Not Found", message: product });
      return false;
    }

    if (product.stock === 0) {
      console.log(product.stock);
      res.status(400).send({ error: `No hay stock` });
    }

    if (cart) {
      const productExists = cart.products.find((prod) => prod.id_prod == pid);

      if (!productExists) {
        cart.products.push({ id_prod: product._id, quantity: 1 });
      } else if (productExists.quantity < product.stock) {
        productExists.quantity++;
      } else {
        return res.status(400).send({ error: `No hay stock suficiente` });
      }

      await cart.save();
      return res.status(200).send({ resultado: "OK", message: cart });
    } else {
      res.status(404).send({ resultado: "Cart Not Found", message: cart });
    }
  } catch (error) {
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    res.status(400).send({ error: `Error al crear producto: ${error}` });
  }
};

export const updateQuantity = async (req, res) => {
  // agregar cantidad de un producto
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  const product = await productModel.findById(pid);

  if (product.stock < productExists.quantity + quantity) {
    res.status(400).send({ error: `No hay stock suficiente` });
  }

  try {
    const cart = await cartModel.findById(cid);

    if (cart) {
      const productExists = cart.products.find((prod) => prod.id_prod == pid);
      if (productExists) {
        productExists.quantity += quantity;
      } else {
        res.status(404).send({ resultado: "Product Not Found", message: cart });
        return;
      }
      await cart.save();
      res.status(200).send({ resultado: "OK", message: cart });
    } else {
      res.status(404).send({ resultado: "Cart Not Found", message: cart });
    }
  } catch (error) {
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    res.status(400).send({ error: `Error al agregar productos: ${error}` });
  }
};

export const deleteProductFromCartById = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      const indice = cart.products.findIndex((prod) => prod.id_prod._id == pid);
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
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    res.status(400).send({ error: `Error al eliminar producto: ${error}` });
  }
};
export const emptyCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartModel.findById(cid);
    if (cart) {
      cart.products = [];
      await cart.save();
      res.status(200).send({
        respuesta: "OK",
        mensaje: `Productos fue eliminados correctamente, ${cart}`,
      });
    }
  } catch (error) {
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    res.status(400).send({ error: `Error al eliminar producto: ${error}` });
  }
};

export const purchaseCart = async (req, res) => {
  const { cid } = req.params;

  try {

    const cart = await cartModel.findById(cid);
    const products = await productModel.find();

    if (cart) {
      const user = await userModel.find({ cart: cart._id });
      const email = user[0].email;
      let amount = 0;
      const purchaseItems = [];
      cart.products.forEach(async (item) => {
        const product = products.find(
          (prod) => prod._id == item.id_prod.toString()
        );
        if (product.stock >= item.quantity) {
          amount += product.price * item.quantity;
          product.stock -= item.quantity;
          await product.save();
          purchaseItems.push(product.title);
        }
      });
      await cartModel.findByIdAndUpdate(cid, { products: [] });
      const ticket = {
        code: uuidv4(),
        amount: amount,
        purchaser: email,
      };
      await ticketModel.create(ticket);
      const ticketGenerado = await ticketModel.findOne({ code: ticket.code });
      res
        .status(201)
        .send({
          response: "Ticket generado con éxito",
          message: ticketGenerado,
        });
    } else {
      res.status(404).send({ resultado: "Not Found", message: cart });
    }
  } catch (error) {
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    res.status(400).send({ error: `Error al consultar carrito: ${error}` });
  }
};
