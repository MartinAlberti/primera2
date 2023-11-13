
export const signUp = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).send({ mensaje: "Usuario ya existente" });
      }
      return res.redirect("/static/login");
    } catch (error) {
      logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

      res.status(500).send({ mensaje: `Error al crear usuario ${error}` });
    }
  }

 