document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (event) => {
      if (!event.target.classList.contains('addToCartBtn')) {
        const productId = card.getAttribute('data-product-id');
        window.location.href = `http://localhost:8080/static/product/${productId}`;
      }
    });
  });

  document.querySelectorAll('.addToCartBtn').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent the click event from bubbling up to the card
      const productId = button.getAttribute('data-product-id');
      addToCart(productId);
    });
  });

  document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const category = document.getElementById('category').value;
    const sort = document.getElementById('sort').value;
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }

    window.location.search = params.toString();
  });
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
    window.location.href = `http://localhost:8080/static/login`;
  }
}