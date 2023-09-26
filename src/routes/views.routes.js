import { Router } from "express";
import productModel from "../models/products.model.js";
const routerHandlebars = Router();

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
export default routerHandlebars;
