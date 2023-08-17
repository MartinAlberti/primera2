import express from "express";
import path from "path"
import { engine } from "express-handlebars"
import { Server } from "socket.io"
import { __dirname } from "./path.js";
import routerProd from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";


const PORT = 8080;
const app = express();

//server
const server = app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});

const io = new Server(server)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine())
app.set("view engine", "handlebars" )
app.set("views", path.resolve(__dirname, "./views"))

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

app.get('/static', (req, res) => {
  const user = {
      nombre: "Lucia",
      cargo: "Tutor"
  }

  const cursos = [
      { numCurso: "123", dia: "LyM", horario: "Noche" },
      { numCurso: "456", dia: "MyJ", horario: "Tarde" },
      { numCurso: "789", dia: "S", horario: "Mañana" }
  ]

  //Indicar que plantilla voy a utilizar
  res.render("users", {
      titulo: "Users",
      usuario: user,
      rutaCSS: "users.css",
      isTutor: user.cargo == "Tutor",
      cursos: cursos
  })

})





