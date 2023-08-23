import express from "express";
import path from "path";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import routerProd from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import { ProductManager } from "./controllers/productManager.js";
const productManager = new ProductManager("./src/models/products.json");
const products = await productManager.getProducts();
const PORT = 8080;
const app = express();

//server
const server = app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});

const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));

//Coneccion de Socket.io
io.on("connection", (socket) => {
  console.log(`Conexion con Socket.io`);
  socket.on('load', async () => {
		const products = await productManager.getProducts();
		socket.emit('products', products);
	});
  //Add Product
  socket.on("nuevoProducto", async (prod) => {
    productManager.addProduct(prod);
    const products = await productManager.getProducts();
    socket.emit("products", products);
  });
  
  
});

app.use("/static", express.static(path.join(__dirname, "/public"))); //path.join() es una concatenacion de una manera mas optima que con el +
app.use("/api/products", routerProd);
app.use("/api/carts", routerCart);

app.get("/static", async (req, res) => {
  res.render("realTimeProducts", {
    rutaCSS: "realTimeProducts",
    rutaJS: "realTimeProducts",
  });
});
app.get("/static/home", async (req, res) => {
  res.render("home", {
    rutaCSS: "home",
    products,
  });
});

// app.get("/static", async (req, res) => {
//   const products = await productManager.getProducts()
//   res.render("home", {  products });

// });
