import { Router } from "express";
import passport from "passport";
import * as userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/", passport.authenticate("register"), userController.signUp);

export default userRouter;
