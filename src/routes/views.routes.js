import { Router } from "express";

const routerHandlebars = Router();
import productModel from "../models/products.model.js";
import { userModel } from "../models/users.model.js";

routerHandlebars.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {
    rutaCSS: "realTimeProducts",
    rutaJS: "realTimeProducts",
  });
});

routerHandlebars.get("/home", async (req, res) => {
  const products = await productModel.find().lean();
  const info = req.query.info;
  res.render("home", {
    rutaCSS: "home",
    rutaJS: "home",
    products,
    info,
  });
});

routerHandlebars.get("/chat", async (req, res) => {
  res.render("chat", {
    rutaJS: "chat",
    rutaCSS:"chat"
  });
});

routerHandlebars.get("/register", async (req, res) => {
  res.render("register",{
    rutaCSS: "register",
  });
});

routerHandlebars.get("/login", async (req, res) => {
  res.render("login",{
    rutaCSS: "login",
  });
});

routerHandlebars.get("/logout", async (req, res) => {
  res.render("logout", {
    rutaJS: "logout",
  });
});

export default routerHandlebars;
