// main.js
import './style.css';
import { setupCounter } from './counter.js';

document.querySelector('#app').innerHTML = `
  <div>
    <div id="adminPanel">
      <label for="productName">Product Name:</label>
      <input type="text" id="productName" />

      <label for="productPrice">Product Price:</label>
      <input type="number" id="productPrice" />

      <button onclick="addProduct()">Add Product</button>
    </div>

    <div id="gallery" class="gallery"></div>
  </div>
`;

const { getProducts, addProduct, deleteProduct } = setupCounter(document.querySelector('#gallery'));

// Fetch and display products on page load
getProducts();

window.addProduct = () => {
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;

  // Validate inputs
  if (!productName || !productPrice) {
    alert('Please enter product name and price.');
    return;
  }

  // Add the product
  addProduct({ name: productName, price: parseFloat(productPrice) });

  // Clear input fields
  document.getElementById('productName').value = '';
  document.getElementById('productPrice').value = '';
};

window.deleteProduct = (productId) => {
  // Delete the product
  deleteProduct(productId);
};
