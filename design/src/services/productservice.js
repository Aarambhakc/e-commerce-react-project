import axios from "axios";

const BASE_URL = "http://localhost:3000/products";

export async function getProducts(errorHandler) {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    if (typeof errorHandler === "function") {
      errorHandler(error);
    }
    throw error;
  }
}

export async function getProductById(id, errorHandler) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (typeof errorHandler === "function") {
      errorHandler(error);
    }
    throw error;
  }
}

export async function getCategories() {
  const response = await fetch(
    "http://localhost:3000/categories"
  );

  return response.json();
}

export async function updateProduct(id, updatedProduct) {
  try {
    const response = await axios.put(
      `${BASE_URL}/${id}`,
      updatedProduct
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}