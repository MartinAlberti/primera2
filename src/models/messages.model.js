import { Schema, model } from "mongoose";

//Definicion de mi esquema de datos.
const messageSchema  = new Schema({
  user: String,
  mensaje: String,
});

//defino mi modelo con un nombre y un schema
 const messageModel  = model("chat", messageSchema );
 export default messageModel 