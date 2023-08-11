import { promises as fs } from "fs";

export class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
    this.products = []
  }

  async createCart(cart) {
    const carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const maxId = carts.reduce(
      (max, cart) => Math.max(max, cart.id || 0),
      0
    );

    cart.id = maxId + 1;
    const existCart = carts.find((carrito) => carrito.id === cart.code);
    if (existCart) {
      return false;
    } else {
      cart.products = this.products
      carts.push(cart);
      await fs.writeFile(this.path, JSON.stringify(carts));
      return true;
    }
  }
  

  async getCartById(cid) {
    let carts = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const cart = carts.find((cart) => cart.id === cid);
    if (cart) {
      return cart;
    } else {
      console.log("Carrito no existe");
    }
  }
}
