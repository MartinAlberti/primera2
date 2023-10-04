import "dotenv/config";
import express from "express";
import path from "path";
import router from "./routes/index.routes.js";
import mongoConnection from "./Db/mongo.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import messageModel from "./models/messages.model.js";
import productModel from "./models/products.model.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from 'passport'
import initializePassport from './config/passport.js'

import { userModel } from "./models/users.model.js";
// import FileStorage from "session-file-store"

const PORT = 8080;
// const fileStorage = new FileStorage(session)

const app = express();

//server
const server = app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});

const io = new Server(server);

mongoConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 60,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
app.use("/static", express.static(path.join(__dirname, "/public"))); //path.join() es una concatenacion de una manera mas optima que con el +

app.use("/", router)


//Coneccion de Socket.io
io.on("connection", (socket) => {
  console.log(`Conexion con Socket.io`);
  socket.on("load", async () => {
    const products = await productModel.find();
    socket.emit("products", products);
  });
  //Add Product
  socket.on("nuevoProducto", async (prod) => {
    productModel.create(prod);
    const products = await productModel.find();
    socket.emit("products", products);
  });
  //Chat
  socket.on("mensaje", async (info) => {
    await messageModel.create(info);
    io.emit("mensajes", mensajes);
  });
  
});



