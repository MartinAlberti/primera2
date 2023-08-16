import express from "express";
import path from "path"
import { engine } from "express-handlebars"
import { Server } from "socket.io"
import { __dirname } from "./path.js";
import routerProd from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";


const PORT = 4000;
const app = express();

//server
const server = app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});

const io = new Server(server)

app.use(express.json())
app.engine("handlebars", engine())
app.set("view engine", "handlebars" )
app.set("views", path.resolve((__dirname), "./views"))
console.log((__dirname),"/views")
app.use(express.urlencoded({ extended: true }));

//Coneccion de Socket.io
io.on("connection", (socket) => {
console.log(`Conexion con Socket.io`)
socket.on("mensaje", info => {
  console.log(info)
  socket.emit("respuesta", "Hola usuario, conexion establecida")
} )
})

app.use('/static', express.static(path.join(__dirname, '/public'))) //path.join() es una concatenacion de una manera mas optima que con el +
app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)



app.get("*", (req, res) => {
  res.send("Error 404");
});


