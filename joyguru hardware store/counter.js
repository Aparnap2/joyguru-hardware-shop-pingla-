// counter.js
import axios from 'axios';

const apiUrl = '/api'; // Assumes you've set up the proxy in vite.config.js

export const setupCounter = (galleryElement) => {
  const addProduct = async (product) => {
    try {
      await axios.post(`${apiUrl}/products`, product);
      // Refresh the gallery after adding a product
      getProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products`);
      displayProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${apiUrl}/products/${productId}`);
      // Refresh the gallery after deleting a product
      getProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const displayProducts = (products) => {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    products.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: $${product.price}</p>
        <button onclick="deleteProduct('${product._id}')">Delete</button>
      `;
      gallery.appendChild(productCard);
    });
  };

  return { addProduct, getProducts, deleteProduct };
};
