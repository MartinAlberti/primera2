const socket = io();

const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const datForm = new FormData(e.target); //Formulario que disparo el evento
  const user = Object.fromEntries(datForm); //Dado un objeto iterable, devuelve los datos en un objeto simple
  socket.emit("nuevoUsuario", {first_name:user.first_name, last_name:user.last_name, email:user.email, password: user.password});
  e.target.reset();
});
