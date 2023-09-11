import { Router } from "express";
import { ProductManager } from "../controllers/productManager.js";
import productModel from "../models/products.model.js";
const routerProd = Router();

const productManager = new ProductManager("./src/models/products.json");

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
  // const id = parseInt(req.params.id);
  // const product = await productManager.getProductById(id);
  // product
  //   ? res.status(200).send(product)
  //   : res.status(400).send("Producto no encontrado");
});

routerProd.get("/", async (req, res) => {
  let limit = parseInt(req.query.limit)
  let  page  = parseInt(req.query.page)
  let  sort  = req.query.sort
  let category = req.query.category

  if(!limit) limit= 10
  if(!page) page= 1
  if(!category) category=null

console.log(category)

  try {
    if(category){
      const prods = await productModel.paginate({category:category},{limit : limit, page:page, sort: {price: sort} } )
      console.log(prods)
      res.status(200).send({ resultado: 'OK', message: prods })
    }
    else{
      const prods = await productModel.paginate({},{limit : limit, page:page, sort: {price: sort} } )
      console.log(prods)
      res.status(200).send({ resultado: 'OK', message: prods })
    }

} catch (error) {
    res.status(400).send({ error: `Error al consultar productos: ${error}` })
}
});

routerProd.post("/", async (req, res) => {
  try {
    const { title, description, stock, code, price, category } = req.body;

    await productManager.addProduct(req.body);
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
  const { id } = req.params
  const { title, description, stock, code, price, category, status } = req.body
  try {
      const respuesta = await productModel.findByIdAndUpdate(id, { title, description, stock, code, price, category, status })
      if (respuesta)
          res.status(200).send({ resultado: 'OK', message: respuesta })
      else
          res.status(404).send({ resultado: 'Not Found', message: respuesta })
  } catch (error) {
      res.status(400).send({ error: `Error al actualizar producto: ${error}` })
  }

  // const id = parseInt(req.params.id);
  // const confirmacion = await productManager.updateProduct(id, req.body);

  // if (confirmacion) res.status(200).send("Producto actualizado correctamente");
  // else res.status(404).send("Producto no encontrado");
});

routerProd.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
      const respuesta = await productModel.findByIdAndDelete(id)
      if (respuesta)
          res.status(200).send({ resultado: 'OK', message: respuesta })
      else
          res.status(404).send({ resultado: 'Not Found', message: respuesta })
  } catch (error) {
      res.status(400).send({ error: `Error al eliminar producto: ${error}` })
  }
  // const id = parseInt(req.params.id);

  // const confirmacion = await productManager.deleteById(id);
  // if (confirmacion) res.status(200).send("Producto eliminado");
  // else res.status(404).send("Producto no encontrado");
});

export default routerProd;
