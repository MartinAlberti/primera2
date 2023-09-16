import { Router } from "express";
import productModel from "../models/products.model.js";
const routerProd = Router();


routerProd.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const prod = await productModel.findById(id);
    if (prod) {
      res.status(200).send({ resultado: "OK", message: prod });
    } else res.status(404).send({ resultado: "Not Found", message: prod });
  } catch (error) {
    res.status(400).send({ error: `Error al consultar producto: ${error}` });
  }
});

routerProd.get("/", async (req, res) => {
  let { limit, page, sort, category } = req.query;

  if (!limit) limit = 10;
  if (!page) page = 1;


  try {
    if (category) {
      const prods = await productModel.paginate(
        { category: category },
        { limit: limit, page: page, sort: { price: sort } }
      );
      res.status(200).send({ resultado: "OK", message: prods });
    } else {
      const prods = await productModel.paginate(
        {},
        { limit: limit, page: page, sort: { price: sort } }
      );
      res.status(200).send({ resultado: "OK", message: prods });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al consultar productos: ${error}` });
  }
});

routerProd.post("/", async (req, res) => {
  try {
    const { title, description, stock, code, price, category } = req.body;
    const respuesta = await productModel.create({
      title,
      description,
      stock,
      code,
      price,
      category,
    });
    res.status(200).send({ resultado: "OK", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al crear producto: ${error}` });
  }
});

routerProd.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, stock, code, price, category, status } = req.body;
  try {
    const respuesta = await productModel.findByIdAndUpdate(id, {
      title,
      description,
      stock,
      code,
      price,
      category,
      status,
    });
    if (respuesta)
      res.status(200).send({ resultado: "OK", message: respuesta });
    else res.status(404).send({ resultado: "Not Found", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al actualizar producto: ${error}` });
  }
});

routerProd.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const respuesta = await productModel.findByIdAndDelete(id);
    if (respuesta)
      res.status(200).send({ resultado: "OK", message: respuesta });
    else res.status(404).send({ resultado: "Not Found", message: respuesta });
  } catch (error) {
    res.status(400).send({ error: `Error al eliminar producto: ${error}` });
  }
});

export default routerProd;
