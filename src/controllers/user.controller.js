
export const signUp = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).send({ mensaje: "Usuario ya existente" });
      }
      return res.redirect("/static/login");
    } catch (error) {
      res.status(500).send({ mensaje: `Error al crear usuario ${error}` });
    }
  }

 