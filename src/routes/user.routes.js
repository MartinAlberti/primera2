import { Router } from "express";
import { userModel } from "../models/users.model.js";
import { createHash } from "../utils/bcrypt.js";
import passport from "passport";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send("Error al consultar users");
  }
});
userRouter.post("/", passport.authenticate("register"), async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).send({ mensaje: "Usuario ya existente" });
    }
    return res.redirect("/static/login");
  } catch (error) {
    res.status(500).send({ mensaje: `Error al crear usuario ${error}` });
  }
});
export default userRouter;
