import "dotenv/config";
import path from "path";
import { __dirname } from "./path.js";
import express from "express";
import router from "./routes/index.routes.js";
import mongoConnection from "./Db/mongo.js";
import MongoStore from "connect-mongo";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import messageModel from "./models/messages.model.js";
import productModel from "./models/products.model.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from 'passport'
import initializePassport from './config/passport.js'
import { requestLogger } from "./middlewares/requestLogger.js";

//server
const PORT = 8080;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});

const io = new Server(server);

//Mongo DB
mongoConnection();

//Middlewares
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
app.use(requestLogger)

//Routes

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



