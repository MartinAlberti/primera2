import { Router } from "express";
import passport from "passport";
import { authorization, passportError } from "../utils/errorMessages.js";

const sessionRouter = Router();

sessionRouter.post(
  "/login",
  passport.authenticate("login"),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).send({ mensaje: "Invalidate user" });
      }

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
      };

      res.redirect(`/static/home?info=${req.session.user.first_name}`);
    } catch (error) {
      res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
    }
  }
);
sessionRouter.get(
  "/testJWT",
  passport.authenticate("jwt", { session: false }),async  (req, res) => {
    res.status(200).send({mensaje: req.user});
  })
;

sessionRouter.get("/current", passportError("jwt"), authorization("user"),(req,res)=>{
  res.send(req.user)
})

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    res.status(200).send({ mensaje: "Usuario creado" });
  }
);

sessionRouter.get(
  "/githubSession",
  passport.authenticate("github"),
  async (req, res) => {
    req.session.user = req.user;
    res.status(200).send({ mensaje: "Session creada" });
  }
);

sessionRouter.get("/logout", (req, res) => {
  try {
    if (req.session.login) {
      req.session.destroy();
      console.log(req.session);
    }

    res.redirect("/static/login");
  } catch (error) {
    res.status(400).send({ error: `Error al termianr sesion: ${error}` });
  }
});

export default sessionRouter;
