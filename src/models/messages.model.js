import { Schema, model } from "mongoose";

//Definicion de mi esquema de datos.
const messageSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
});

//defino mi modelo con un nombre y un schema
const messageModel = model("messages", messageSchema);
export default messageModel;
