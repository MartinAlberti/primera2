import { Router } from "express";
import { userModel } from "../models/users.model.js";

const routerSession = Router();

routerSession.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (req.session.login)
      res.status(200).send({ error: `Login ya existente:` });

    const user = await userModel.findOne({ email: email });
    if (user) {
      if (user.password == password) {
        //login
        req.session.login = true;
        // res.status(200).send({ mensaje: `Usuario logueado correctamente: ${user}` });

        res.redirect(`/static/home?info=${user.first_name}`);
        return;
      } else {
        res.render("login", { message: "Incorrect password" });

        // res.status(401).send({ error: `Unauthorized: ${user}` });
      }
    } else {
      res.status(404).send({ error: `Usuario no existe: ${user}` });
    }
  } catch (error) {
    res.render("login", { message: "Error in login" });
  }
});

routerSession.get("/logout", (req, res) => {
  try {
    if (req.session.login) {
      req.session.destroy();
    }
    res.redirect("/static/login");

  } catch (error) {
    res.status(400).send({ error: `Error al termianr sesion: ${error}` });
  }
});

export default routerSession;
