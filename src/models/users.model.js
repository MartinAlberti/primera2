import { Schema, model } from "mongoose";

//Definicion de mi esquema de datos.
const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol:{
    type: String,
    default: "user"
  }
});

//defino mi modelo con un nombre y un schema
export const userModel = model("users", userSchema);
