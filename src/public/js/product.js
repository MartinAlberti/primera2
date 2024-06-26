
document.addEventListener('DOMContentLoaded', () => {
 
    document.querySelectorAll('.addToCartBtn').forEach(button => {
      button.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the card
        const productId = button.getAttribute('data-product-id');
        addToCart(productId);
      });
    });
  });
  async function addToCart(productId) {
    const cartIdElement = document.getElementById('cart-id');
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
      // console.error('Error al agregar el producto:', error);
      // alert('Error al agregar el producto. Consulte la consola para más detalles.');
      window.location.href = `http://localhost:8080/static/login`;

    }
  }