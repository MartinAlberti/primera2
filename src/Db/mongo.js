import 'dotenv/config'

import mongoose from "mongoose";
export default  function mongoConnection() {
  mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => console.log("DB conectada"))
  .catch((error) => console.log("Error en coneccion a mongodb Atlas", error));
}
