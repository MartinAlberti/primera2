import { Schema, model } from "mongoose";
import cartModel from "./carts.model.js";
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
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    default: "user",
  },
  age: {
    type: Number,
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId, //Id autogenerado de MongoDB
    ref: "carts",
  },
});
userSchema.pre("save", async function (next) {
  try {
    const newCart = await cartModel.create({});
    this.cart = newCart._id;
  } catch (error) {
    logger.error(`[ERROR] - Date: ${new Date().toLocaleString()} - ${error.message}`)

    next(error);
  }
});
const userModel = model("users", userSchema);
export default userModel
