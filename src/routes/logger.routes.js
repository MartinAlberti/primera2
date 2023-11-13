import { Router } from "express";
import { logger } from "../utils/logger.js";

const loggerRouter = Router()

loggerRouter.get("/",(req,res)=>{
    
        logger.debug("Debug");
        logger.info("Info");
        logger.warning(`[WARNING]  - Date: ${new Date().toLocaleString()} - WARNING`);
        logger.error(`[ERROR]  - Date: ${new Date().toLocaleString()} - ERROR`);
        logger.fatal(`[FATAL]  - Date: ${new Date().toLocaleString()} - FATAL`);
        return;
      });

      export default loggerRouter