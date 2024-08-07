document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (event) => {
      if (!event.target.classList.contains('addToCartBtn')) {
        const productId = card.getAttribute('data-product-id');
        window.location.href = `http://localhost:8080/static/product/${productId}`;
      }
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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".addToCartBtn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click event from bubbling up to the card
      const productId = button.getAttribute("data-product-id");
      addToCart(productId, button);
    });
  });
});

async function addToCart(productId, button) {
  const cartIdElement = document.getElementById("cart-ID");
  const cartId = cartIdElement.textContent.replace("CartId: ", "").trim();

  try {
    // Add product to the cart
    const response = await fetch(
      `http://localhost:8080/api/carts/${cartId}/product/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      // Fetch updated cart quantity
      const quantityResponse = await fetch(
        `http://localhost:8080/api/carts/${cartId}/quantity/`
      );
      const data = await quantityResponse.json();

      if (quantityResponse.ok) {
        // Update the cart quantity display
        const cartQuantityElement = document.getElementById("cart-quantity");
        cartQuantityElement.textContent = data.quantity;

        // Show feedback message on the button
        showFeedbackMessage(button);
      } else {
        console.error("Error fetching cart quantity:", data.error);
      }
    } else {
      const result = await response.json();
      console.error(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error(error.message);
    window.location.href = `http://localhost:8080/static/login`;
  }
}

function showFeedbackMessage(button) {
  const feedbackMessage = button.querySelector(".feedback-message");
  feedbackMessage.classList.add("show");
  setTimeout(() => {
    feedbackMessage.classList.remove("show");
  }, 2000); // Duration to show the feedback message
}