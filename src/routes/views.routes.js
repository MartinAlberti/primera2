import { Router } from "express";
import productModel from "../models/products.model.js";
const viewsRouter = Router();

viewsRouter.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {
    rutaCSS: "realTimeProducts",
    rutaJS: "realTimeProducts",
  });
});
viewsRouter.get("/home", async (req, res) => {
  const products = await productModel.find().lean();
  const info = req.query.info;
  res.render("home", {
    rutaCSS: "home",
    rutaJS: "home",
    products,
    info,
  });
});
viewsRouter.get("/chat", async (req, res) => {
  res.render("chat", {
    rutaJS: "chat",
    rutaCSS:"chat"
  });
});
viewsRouter.get("/register", async (req, res) => {
  res.render("register",{
    rutaCSS: "register",
  });
});
viewsRouter.get("/login", async (req, res) => {
  res.render("login",{
    rutaCSS: "login",
  });
});
export default viewsRouter;
