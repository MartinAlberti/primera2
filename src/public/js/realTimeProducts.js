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
    
    // const tableBody = document.querySelector("#productTable tbody");
  
    // for (let i = 0; i < products.length; i++) {
    //   const product = products[i];
    //   const row = tableBody.insertRow();
  
    //   // Insert cell values
    //   const idCell = row.insertCell(0);
    //   idCell.innerHTML = product.title;
  
    //   const nameCell = row.insertCell(1);
    //   nameCell.innerHTML = product.description;
  
    //   const priceCell = row.insertCell(2);
    //   priceCell.innerHTML = product.category;
  
    //   const categoryCell = row.insertCell(3);
    //   categoryCell.innerHTML = `$${product.price}`;
  
    //   const stockCell = row.insertCell(4);
    //   stockCell.innerHTML = product.stock;
  
    //   const codeCell = row.insertCell(5);
    //   codeCell.innerHTML = product.code;
    // }
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



