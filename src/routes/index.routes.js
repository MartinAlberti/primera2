import { Router } from "express";
import cartRoutes from "./carts.routes.js";
import productsRouter from "./products.routes.js";
import sessionRouter from "./sessions.routes.js";
import userRouter from "./user.routes.js";
import viewsRouter from "./views.routes.js";
import { logger } from "../utils/logger.js";

const router = Router()

router.use("/static", viewsRouter);
router.use("/api/products", productsRouter);
router.use("/api/carts", cartRoutes);
router.use("/api/users", userRouter);
router.use("/api/sessions", sessionRouter);
router.use("/loggerTest", (req,res)=> {
    logger.debug("Debug");
    logger.info("Info");
    logger.warning(`[WARNING]  - Date: ${new Date().toLocaleString()} - WARNING`)
    logger.error(`[ERROR]  - Date: ${new Date().toLocaleString()} - ERROR`)
    logger.fatal(`[FATAL]  - Date: ${new Date().toLocaleString()} - FATAL`)


})

export default router