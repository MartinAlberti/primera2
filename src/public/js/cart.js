async function purchaseCart(cartId) {
    try {
      const response = await fetch(`http://localhost:8080/api/carts/${cartId}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT in localStorage
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        window.location.href = `http://localhost:8080/static/ticket?info=${encodeURIComponent(JSON.stringify(data.message))}`;
      } else {
        const errorData = await response.json();
        alert(`Purchase failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during the purchase.');
    }
  }
  