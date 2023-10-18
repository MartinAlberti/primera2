import productModel from "../models/products.model.js";

export const realtimeproductsView = async (req, res) => {
  res.render("realTimeProducts", {
    rutaCSS: "realTimeProducts",
    rutaJS: "realTimeProducts",
  });
};
export const homeView = async (req, res) => {
  const products = await productModel.find().lean();
  const info = req.query.info;
  res.render("home", {
    rutaCSS: "home",
    rutaJS: "home",
    products,
    info,
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
