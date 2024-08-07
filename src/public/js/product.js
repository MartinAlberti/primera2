document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".addToCartBtn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click event from bubbling up to the card
      const productId = button.getAttribute("data-product-id");
      addToCart(productId);
    });
  });
});
async function addToCart(productId) {
  const cartIdElement = document.getElementById("cart-id");
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
      } else {
        console.error("Error fetching cart quantity:", data.error);
      }
    } else {
      const result = await response.json();
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = `http://localhost:8080/static/login`;
  }
}

document.querySelectorAll(".carousel-img").forEach((img) => {
  img.addEventListener("click", function () {
    const modalImage = document.getElementById("modalImage");
    modalImage.src = this.src;
  }); 
});
