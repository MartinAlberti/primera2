import { Router } from "express";
import { passportError, authorization } from "../utils/errorMessages.js";

import * as viewsController from "../controllers/views.controller.js";
const viewsRouter = Router();

viewsRouter.get("/realtimeproducts",passportError("jwt"),authorization("admin"), viewsController.realtimeproductsView);
viewsRouter.get("/home", viewsController.homeView);
viewsRouter.get("/chat", viewsController.chatView);
viewsRouter.get("/register", viewsController.registerView);
viewsRouter.get("/login", viewsController.loginView);
viewsRouter.get("/cart", viewsController.cartView);
viewsRouter.get("/ticket", viewsController.ticketView);

export default viewsRouter;
