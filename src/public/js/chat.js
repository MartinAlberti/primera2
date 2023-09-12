const socket = io();

const buttonChat = document.getElementById("buttonChat");
const parrafosMensajes = document.getElementById("parrafosMensajes");
const valInput = document.getElementById("chatBox");
let email;

Swal.fire({
  title: "Identificacion de usuario",
  text: "Por favor ingrese su email",
  input: "text",
  inputValidator: (valor) => {
    return !valor && "Ingrese un email de usuario valido";
  },
  allowOutsideClick: false,
}).then((resultado) => {
  email = resultado.value;
});

buttonChat.addEventListener("click", () => {
  let date = new Date().toLocaleString()

  if (valInput.value.trim().length > 0) {
    socket.emit("mensaje", { date: date, user: email, mensaje: valInput.value });
    valInput.value = "";
  }
});

socket.on("mensajes", arrayMensajes => {
    parrafosMensajes.innerHTML = ""
    arrayMensajes.forEach(mensaje =>{
        parrafosMensajes.innerHTML += `<p> ${mensaje.date} <strong>${mensaje.user}</strong>: <i>${mensaje.mensaje}</i></p>`
    })
})
