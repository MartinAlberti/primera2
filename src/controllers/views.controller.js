import productModel from "../models/products.model.js";
import cartModel from "../models/carts.model.js";

export const realtimeproductsView = async (req, res) => {
  res.render("realTimeProducts", {
    rutaCSS: "realTimeProducts",
    rutaJS: "realTimeProducts",
  });
};
export const homeView = async (req, res) => {
  let { category, sort } = req.query;
  let filter = {};
  let sortOption = {};
  let cartQuantity = 0;

  if (category) {
    filter.category = category;
  }

  if (sort) {
    sortOption.price = sort === 'asc' ? 1 : -1;
  }

  const products = await productModel.find(filter).sort(sortOption).lean();
  const user = req.session.user;

  // Calculate cartQuantity
  if (user && user.cart) {
    const cart = await cartModel.findById(user.cart);
    if (cart && cart.products) {
      cartQuantity = cart.products.reduce((acc, item) => acc + item.quantity, 0);
    }
  }

  res.render("home", {
    rutaCSS: "home",
    rutaJS: "home",
    products,
    user,
    category,
    sort,
    cartQuantity
  });
};
export const productView = async (req, res) => {
  const productId = req.params.id; // Get product ID from URL params
  const product = await productModel.findById(productId); // Fetch product from database
  const user = req.session.user;
  let cartQuantity = 0;

  // Calculate cartQuantity
  if (user && user.cart) {
    const cart = await cartModel.findById(user.cart);
    if (cart && cart.products) {
      cartQuantity = cart.products.reduce((acc, item) => acc + item.quantity, 0);
    }
  }

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.render("product", {
    rutaJS: "product",
    rutaCSS: "product",
    product,
    user,
    cartQuantity
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
    const products = await productModel.find()
    let totalAmount = 0;
    let cartQuantity = 0;

    cart.products.forEach(async (item) => {
      const product = products.find(
        (prod) => prod._id == item.id_prod.toString()
      );
      if (product.stock >= item.quantity) {
        totalAmount += product.price * item.quantity;
        cartQuantity += item.quantity; // Calculate cartQuantity
      }
    });

    // Check if the cart exists and has products
    if (!cart || !cart.products) {
      return res.render("cart", {
        rutaCSS: "cart",
        rutaJS: "cart",
        user: req.session.user,
        products: [],
        message: "No products in cart",
        cartQuantity
      });
    }

    const productIds = cart.products.map((item) => item.id_prod);

    const productsInCart = await productModel.find({
      _id: { $in: productIds },
    });

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
      totalAmount,
      cartQuantity
    });
  } catch (error) {
    console.error("Error retrieving cart products:", error);
    res.status(500).send("Error retrieving cart products");
  }
};

export const ticketView = async (req, res) => {
  const info = req.query.info;
  const ticketInfo = JSON.parse(info);
  const date = new Date();

  // get the current date and time as a string
  const currentDateTime = date.toLocaleString();
  res.render('ticket', {
    rutaCSS: 'ticket',
    rutaJS: 'ticket',
    info: ticketInfo,
    currentDateTime
  });
};
