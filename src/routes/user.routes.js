import { Router } from "express";
import { userModel } from "../models/users.model.js";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send("Error al consultar users");
  }
});
userRouter.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (email === "adminCoder@coder.com" && password === "dminCod3r123") {
      const adminResultado = await userModel.create({
        first_name,
        last_name,
        email,
        password,
        rol: "admin",
      });
      res.redirect("/static/login",200, {"info": adminResultado.first_name})

    } else {
      const resultado = await userModel.create({
        first_name,
        last_name,
        email,
        password,
      });
      res.status(200).send({ mensaje: "Usuario creado", respuesta: resultado });
    }
  } catch (error) {
    res.status(400).send({ error: `Error al crear usuario: ${error}` });
  }
});
export default userRouter;
