import { Schema, model } from "mongoose";

//Definicion de mi esquema de datos.
const chatSchema = new Schema({
  user: String,
  mensaje: String,
});

//defino mi modelo con un nombre y un schema
 const chatModel = model("chat", chatSchema);
 export default chatModel