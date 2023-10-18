import { Router } from "express";
import passport from "passport";
import { authorization, passportError } from "../utils/errorMessages.js";
import  * as sessionController from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.post("/login", passport.authenticate("login"), sessionController.login);

sessionRouter.get(
  "/testJWT",
  passport.authenticate("jwt", { session: false }),
  sessionController.testJwt
);

sessionRouter.get(
  "/current",
  passportError("jwt"),
  authorization("user"),
  sessionController.currentSession
);

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  sessionController.loginGithub
);

sessionRouter.get(
  "/githubSession",
  passport.authenticate("github"),
  sessionController.githubSession
);

sessionRouter.get("/logout", sessionController.logout);

export default sessionRouter;
