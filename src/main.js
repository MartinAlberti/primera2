import 'dotenv/config'
import express from "express";
import path from "path";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import routerProd from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import userRouter from "./routes/user.routes.js";
import routerHandlebars from "./routes/views.routes.js";
import messageModel from "./models/messages.model.js";
import productModel from "./models/products.model.js";
import cookieParser from "cookie-parser";
import session from 'express-session';

const mensajes = [];
const PORT = 8080;
const app = express();

//server
const server = app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});

const io = new Server(server);
mongoose
.connect(process.env.MONGO_URL
)
.then(async () => console.log("DB conectada"))
.catch((error) => console.log("Error en coneccion a mongodb Atlas", error));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true

}))


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
function auth (req ,res, next){
  console.log(req.session.email)
  if(req.session.email === "admin@admin.com" && req.session.password === "1234"){
    return next()

  }
  return res.send("No tienes acceso")
}
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
    console.log(info);
    mensajes.push(info);
    await messageModel.create(info);
    io.emit("mensajes", mensajes);
  });
});


//Cookies
app.get("/setCookie", (req,res) =>{
  res.cookie("CookieCookie", "Esto es el valor de una cookie",{maxAge:60000, signed: true}).send("Coockie creada")
})

app.get("/getCookie", (req,res) =>{
  res.send(req.signedCookies)//Solo cookies firmadas
  // res.send(req.cookies)//totas las cookies
})
 //Session
app.get("/session", (req,res)=>{
  if(req.session.counter){
    req.session.counter++
    res.send(`Has entrado ${req.session.counter} de veces a mi pagina`)
  }
  else{
    req.session.counter = 1
    res.send("Hola por primera vez")
  }
})
app.get("/login", (req,res)=>{
  const {email, password} = req.body
  if(email && password ){
    req.session.email = email
    req.session.password = password

    return res.send("Usuario logueado")
  }
  return res.send("Login fallido")
})

app.get("/admin", auth, (req,res)=>{
  res.send("Sos admin")
})
app.get("/logout", (req,res)=>{
  req.session.destroy(()=>{
    res.send("Salio de la sesion")
  })
})

app.use("/static", express.static(path.join(__dirname, "/public"))); //path.join() es una concatenacion de una manera mas optima que con el +
app.use("/static", routerHandlebars)
app.use("/api/products", routerProd);
app.use("/api/carts", routerCart);
app.use("/api/users", userRouter);

// app.get("/static", async (req, res) => {
//   res.render("realTimeProducts", {
//     rutaCSS: "realTimeProducts",
//     rutaJS: "realTimeProducts",
//   });
// });

// app.get("/static/home", async (req, res) => {
//   const products = await productModel.find().lean();

//   res.render("home", {
//     rutaCSS: "home",
//     products,
//   });
// });

// app.get("/static/chat", async (req, res) => {
//   res.render("chat", {
//     rutaJS: "chat",
//   });
// });
