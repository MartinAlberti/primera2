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

   console.table(products)

});
