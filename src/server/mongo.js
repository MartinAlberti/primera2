import mongoose from "mongoose";
export default  function mongoConnection() {
  mongoose
    .connect(
      "mongodb+srv://martinalberti123:coder1234@cluster0.fjshaho.mongodb.net/ecommerce?retryWrites=true&w=majority"
    )
    .then(() => console.log("DB conectada"))
    .catch((error) => console.log("Error en coneccion a mongodb Atlas", error));
}
