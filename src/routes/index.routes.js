import { Router } from "express";
import cartRoutes from "./carts.routes.js";
import productsRouter from "./products.routes.js";
import sessionRouter from "./sessions.routes.js";
import userRouter from "./user.routes.js";
import viewsRouter from "./views.routes.js";
import ticketsRouter from "./tickets.routes.js"

const router = Router()

router.use("/static", viewsRouter);
router.use("/api/products", productsRouter);
router.use("/api/carts", cartRoutes);
router.use("/api/users", userRouter);
router.use("/api/sessions", sessionRouter);
router.use("/api/tickets", ticketsRouter)


export default router