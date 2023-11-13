import { generateToken } from "../utils/jwt.js";

export const login = async (req, res) => {
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
    const token = generateToken(req.user);
    res.cookie("jwtCookie", token, {
      maxAge: "43200000",
    });
    // res.status(200).send({ payload: req.user });
    res.redirect(`/static/home?info=${req.session.user.first_name}`);
  } catch (error) {
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` });
  }
};

export const currentSession = async (req, res) => {
  res.send(req.user);
};

export const testJwt = async (req, res) => {
  res.status(200).send({ mensaje: req.user });
};

export const loginGithub = async (req, res) => {
  res.status(200).send({ mensaje: "Usuario creado" });
};

export const githubSession = async (req, res) => {
  req.session.user = req.user;
  res.status(200).send({ mensaje: "Session creada" });
};

export const logout = async (req, res) => {
    try {
      if (req.session.login) {
        req.session.destroy();
      }
      res.clearCookie("jwtCookie");
    //   res.status(200).send({ resultado: "Login Terminado" });
      res.redirect("/static/login");
    } catch (error) {
      logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

      res.status(400).send({ error: `Error al termianr sesion: ${error}` });
    }
  }