const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/api/sessions/logout";
});
