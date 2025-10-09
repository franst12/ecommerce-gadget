import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = async (resource) => {
  const response = await axios.get(API_URL + resource);
  return response.data;
};

export const getProductById = async (resource, id) => {
  const response = await axios.get(API_URL + resource + id);
  return response.data;
};
