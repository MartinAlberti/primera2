import { Router } from "express";

const routerHandlebars = Router()
import productModel from "../models/products.model.js";

routerHandlebars.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {
      rutaCSS: "realTimeProducts",
      rutaJS: "realTimeProducts",
    });
  });
  
  routerHandlebars.get("/home", async (req, res) => {
    const products = await productModel.find().lean();
  
    res.render("home", {
      rutaCSS: "home",
      products,
    });
  });
  
  routerHandlebars.get("/chat", async (req, res) => {
    res.render("chat", {
      rutaJS: "chat",
    });
  });
  
  export default routerHandlebars