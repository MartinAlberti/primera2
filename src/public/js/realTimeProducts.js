const socket = io();

const form = document.getElementById("formProduct");
const table = document.getElementById("table");
socket.emit("load");

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

const productsDiv = document.getElementById("productsDiv");

socket.on("products", (products) => {
  productsDiv.innerHTML = "";
  products.forEach((prod) => {
    productsDiv.innerHTML += `
        <div class="product-container">
          <p>Id: ${prod.id}</p>
          <p>Title: ${prod.title}</p>
          <p>Description: ${prod.description}</p>
          <p>Price: ${prod.price}</p>
          <p>Status: ${prod.status}</p>
          <p>Code: ${prod.code}</p>
          <p>Stock: ${prod.stock}</p>
    
        </div>
      
        `;
  });
});
