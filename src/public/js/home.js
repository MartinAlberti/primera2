const logoutButton = document.getElementById("logoutButton");

logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/api/sessions/logout";
});
async function addToCart(productId) {
  const cartIdElement = document.getElementById('cart-ID');
  const cartId = cartIdElement.textContent.replace('CartId: ', '').trim();
  try {
    const response = await fetch(`http://localhost:8080/api/carts/${cartId}/product/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    if (response.ok) {
      alert(`Producto agregado: ${result.message}`);
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Error al agregar el producto:', error);
    alert('Error al agregar el producto. Consulte la consola para más detalles.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#addToCartBtn').forEach(button => {
    button.addEventListener('click', event => {
      const productId = event.target.getAttribute('data-product-id');
      addToCart(productId);
    });
  });
});