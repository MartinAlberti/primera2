const socket = io();

const buttonChat = document.getElementById("buttonChat");
const parrafosMensajes = document.getElementById("parrafosMensajes");
const valInput = document.getElementById("chatBox");
let user;

Swal.fire({
  title: "Identificacion de usuario",
  text: "Por favor ingrese su nombre",
  input: "text",
  inputValidator: (valor) => {
    return !valor && "Ingrese un nombre de usuario valido";
  },
  allowOutsideClick: false,
}).then((resultado) => {
  user = resultado.value;
});

buttonChat.addEventListener("click", () => {
  if (valInput.value.trim().length > 0) {
    socket.emit("mensaje", { user: user, mensaje: valInput.value });
    valInput.value = "";
  }
});

socket.on("mensajes", arrayMensajes => {
    parrafosMensajes.innerHTML = ""
    arrayMensajes.forEach(mensaje =>{
        parrafosMensajes.innerHTML += `<p>${mensaje.user} escribio ${mensaje.mensaje}</p>`
    })
})
