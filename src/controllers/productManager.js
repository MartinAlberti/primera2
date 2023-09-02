import { promises as fs } from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  async addProduct(prod) {
    const prods = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const { title, description, price, code, stock, status } = prod;

		if (!title || !description || !price || !status || !code || !stock) {
			console.log(
				'El producto debe incluir los campos title, description, price, status, code y stock'
			);
			return;
		}
    const maxId = prods.reduce(
      (max, product) => Math.max(max, product.id || 0),
      0
    );

    prod.id = maxId + 1;
    const existProd = prods.find((producto) => producto.code === prod.code);
    if (existProd) {
      return false;
    } else {
      prod.status = true;

      prods.push(prod);
      await fs.writeFile(this.path, JSON.stringify(prods));
      return true;
    }
  }
  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    return products;
  }

  async getProductById(id) {
    let products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prod = products.find((producto) => producto.id === id);
    if (prod) {
      return prod;
    } else {
      console.log("Producto no existe");
    }
  }

  async deleteById(id) {
    let products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    const prods = products.filter((prod) => prod.id != id);

    await fs.writeFile(this.path, JSON.stringify(prods));
    return "Producto eliminado";
  }

  async updateProduct(id, updatedFields) {
    let products = JSON.parse(await fs.readFile(this.path, "utf-8"));

    let foundIndex = products.findIndex((item) => item.id === id);

    if (foundIndex === -1) {
      console.log("No se encontro el producto con el ID especificado");
      return null;
    }

    let updatedProduct = { ...products[foundIndex], ...updatedFields };
    products[foundIndex] = updatedProduct;

    await fs.writeFile(this.path, JSON.stringify(products));

    console.log("Producto actualizado");
    return updatedProduct;
  }
}
