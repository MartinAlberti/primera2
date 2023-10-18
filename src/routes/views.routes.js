import { Router } from "express";
import * as viewsController from "../controllers/views.controller.js";
const viewsRouter = Router();

viewsRouter.get("/realtimeproducts", viewsController.realtimeproductsView);
viewsRouter.get("/home", viewsController.homeView);
viewsRouter.get("/chat", viewsController.chatView);
viewsRouter.get("/register", viewsController.registerView);
viewsRouter.get("/login", viewsController.loginView);
export default viewsRouter;
