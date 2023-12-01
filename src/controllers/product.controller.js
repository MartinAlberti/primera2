import productModel from "../models/products.model.js";
import { faker } from "@faker-js/faker";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import { generateProductErrorInfo } from "../services/errors/info.js";
import { logger } from "../utils/logger.js";

export const getProducts = async (req, res) => {
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
    logger.error(
      `[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`
    );

    res.status(400).send({ error: `Error al consultar productos: ${error}` });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const prod = await productModel.findById(id);
    if (prod) {
      res.status(200).send({ resultado: "OK", message: prod });
    } else res.status(404).send({ resultado: "Not Found", message: prod });
  } catch (error) {
    logger.error(
      `[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`
    );

    res.status(400).send({ error: `Error al consultar producto: ${error}` });
  }
};

export const addProduct = async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;

  if ((!title, !description, !code, !price, !stock, !category)) {
    CustomError.createError({
      name: "Error de creación de producto",
      cause: generateProductErrorInfo({
        title,
        description,
        code,
        price,
        stock,
        category,
      }),
      message: "Error al crear producto",
      code: EErrors.MISSING_OR_INVALID_PRODUCT_DATA,
    });
  }
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
    logger.error(
      `[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`
    );

    res.status(400).send({ error: `Error al crear producto: ${error}` });
  }
};

export const updateProduct = async (req, res) => {
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
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`);

    res.status(400).send({ error: `Error al actualizar producto: ${error}` });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const respuesta = await productModel.findByIdAndDelete(id);
    if (respuesta)
      res.status(200).send({ resultado: "OK", message: respuesta });
    else res.status(404).send({ resultado: "Not Found", message: respuesta });
  } catch (error) {
    logger.error(
      `[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`
    );

    res.status(400).send({ error: `Error al eliminar producto: ${error}` });
  }
};

export const mockingProducts = async (req, res) => {
  try {
    const products = [];
    const modelProduct = () => {
      return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.number.int(),
        status: faker.datatype.boolean(),
        code: faker.internet.password(),
      };
    };
    const createRandomProduct = (productsQuantity) => {
      for (let i = 0; i < productsQuantity; i++) {
        products.push(modelProduct());
      }
      return products;
    };
    const respuesta = createRandomProduct(100);
    if (respuesta)
      res.status(200).send({ resultado: "OK", message: respuesta });
  } catch (error) {
    logger.error(
      `[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`
    );

    res.status(400).send({ error: `Error al crear productos: ${error}` });
  }
};
