//Server connection
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

io.on("connection", (socket) => {
  console.log(`Conexion con Socket.io`);
  //Add Product
  socket.on("nuevoProducto", (prod) => {
    productManager.addProduct(prod);
    socket.emit("mensajeProductoCreado", "El producto se creo correctamente");
  });
  socket.emit("products", products);
});

//Client connection


const socket = io();

const form = document.getElementById("formProduct");
const table = document.getElementById("table");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const datForm = new FormData(e.target); //Formulario que disparo el evento
  const prod = Object.fromEntries(datForm); //Dado un objeto iterable, devuelve los datos en un objeto simple
  socket.emit("nuevoProducto", prod);
  socket.on("mensajeProductoCreado", (mensaje) => {
    Swal.fire(mensaje);
  });
  e.target.reset();
});

socket.on("products", (products) => {
  const productsDiv = document.getElementById("productsDiv");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("m-4");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.classList.add("p-4");
    cardBody.classList.add("shadow");

    const cardTitle = document.createElement("h5");
    cardTitle.textContent = product.title;

    const cardDescription = document.createElement("h6");
    cardDescription.textContent = product.description;

    const cardPrice = document.createElement("h6");
    cardPrice.textContent = `$ ${product.price}`;

    const cardStock = document.createElement("h6");
    cardStock.textContent = `stock: ${product.stock}`;
    cardBody.appendChild(cardTitle);

    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardStock);

    card.appendChild(cardBody);

    productsDiv.appendChild(card);
  });
});
