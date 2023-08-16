import { promises as fs } from "fs";

export class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.products = [];
  }

  async createCart(cart) {
    const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const maxId = carts.reduce((max, cart) => Math.max(max, cart.id || 0), 0);

    cart.id = maxId + 1;
    const existCart = carts.find((carrito) => carrito.id === cart.id);
    if (existCart) {
      return false;
    } else {
      cart.products = this.products;
      carts.push(cart);
      await fs.writeFile(this.path, JSON.stringify(carts));
      return true;
    }
  }
  async addProductToCart(cid, pid) {
    const cart = await this.getCartById(cid);

    if (!cart) return false;

    const products = JSON.parse(
      await fs.readFile("./src/models/products.json", "utf-8")
    );
    const product = products.find((producto) => producto.id === pid);

    if (product) {
      const productExist = cart.products.find((prod) => prod.id === pid);
      productExist
        ? productExist.quantity++
        : cart.products.push({ id: product.id, quantity: 1 });
      const carts = await this.getAllCarts();
      const cartIndex = carts.findIndex(
        (existingCart) => existingCart.id === cart.id
      );
      if (cartIndex !== -1) {
        carts[cartIndex] = cart;
        await fs.writeFile(this.path, JSON.stringify(carts));
      }
      return cart;
    } else {
      console.log("Product does not exist");
      return false;
    }
  }
  async getAllCarts() {
    return JSON.parse(await fs.readFile(this.path, "utf-8"));
  }

  async getCartById(cid) {
    let carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const cart = carts.find((cart) => cart.id === cid);
    if (cart) {
      return cart;
    } else {
      console.log("Carrito no existe");
      return false
    }
  }
}
