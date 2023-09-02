import { Router } from "express";
import { ProductManager } from "../controllers/productManager.js";
import  productModel  from "../models/products.model.js";
const routerProd = Router();

const productManager = new ProductManager("./src/models/products.json");

routerProd.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await productManager.getProductById(id);
  product
    ? res.status(200).send(product)
    : res.status(400).send("Producto no encontrado");
});

routerProd.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts();
  limit
    ? res.status(200).send(products.slice(0, limit))
    : res.status(400).send(products);
});

routerProd.post("/", async (req, res) => {
  try {
    const { title, description, stock, code, price, category } = req.body

    await productManager.addProduct(req.body);
    const respuesta = await productModel.create({
      title, description, stock, code, price, category
  });
    res.status(200).send({ resultado: "OK", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al crear producto: ${error}` });
  }
});

routerProd.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const confirmacion = await productManager.updateProduct(id, req.body);

  if (confirmacion) res.status(200).send("Producto actualizado correctamente");
  else res.status(404).send("Producto no encontrado");
});

routerProd.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  const confirmacion = await productManager.deleteById(id);
  if (confirmacion) res.status(200).send("Producto eliminado");
  else res.status(404).send("Producto no encontrado");
});

export default routerProd;
