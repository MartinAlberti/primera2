import productModel from "../models/products.model.js";
import cartModel from "../models/carts.model.js";

export const realtimeproductsView = async (req, res) => {
  res.render("realTimeProducts", {
    rutaCSS: "realTimeProducts",
    rutaJS: "realTimeProducts",
  });
};
export const homeView = async (req, res) => {
  const products = await productModel.find().lean();
  const user = req.session.user;
  res.render("home", {
    rutaCSS: "home",
    rutaJS: "home",
    products,
    user,
  });
};
export const chatView = async (req, res) => {
  res.render("chat", {
    rutaJS: "chat",
    rutaCSS: "chat",
  });
};
export const registerView = async (req, res) => {
  res.render("register", {
    rutaCSS: "register",
  });
};
export const loginView = async (req, res) => {
  res.render("login", {
    rutaCSS: "login",
  });
};
export const cartView = async (req, res) => {
  try {
    const cartId = req.session.user.cart;
    const cart = await cartModel.findById(cartId);
    console.log(cart);

    // Check if the cart exists and has products
    if (!cart || !cart.products) {
      return res.render("cart", {
        rutaCSS: "cart",
        rutaJS: "cart",
        user: req.session.user,
        products: [],
        message: "No products in cart",
      });
    }

    const productIds = cart.products.map((item) => item.id_prod);

    const productsInCart = await productModel.find({
      _id: { $in: productIds },
    });
    console.log(productsInCart);

    const productsWithQuantities = productsInCart.map((product) => {
      const cartProduct = cart.products.find((item) =>
        item.id_prod.equals(product._id)
      );
      return {
        ...product.toObject(),
        quantity: cartProduct.quantity,
      };
    });
    res.render("cart", {
      rutaCSS: "cart",
      rutaJS: "cart",
      user: req.session.user,
      products: productsWithQuantities,
    });
  } catch (error) {
    console.error("Error retrieving cart products:", error);
    res.status(500).send("Error retrieving cart products");
  }
};
export const ticketView = async (req, res) => {
  const info = req.query.info;
  const ticketInfo = JSON.parse(info);

  res.render('ticket', {
    rutaCSS: 'ticket',
    rutaJS: 'ticket',
    info: ticketInfo,
  });
};
