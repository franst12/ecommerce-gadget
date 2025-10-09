import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const authLogin = async (resource, query, data) => {
  const response = await axios.post(API_URL + resource + '/' + query, data);
  return response.data;
};

export const postData = async (resource, data, config = {}) => {
  const response = await axios.post(API_URL + resource, data, config);
  return response.data;
};

export const fetchDatas = async (resource, query) => {
  const response = await axios.get(API_URL + resource + '/' + query);
  return response.data;
};

export const getDatas = async (resource) => {
  const response = await axios.get(API_URL + resource);
  return response.data;
};

export const updateData = async (resource, id, data, config = {}) => {
  const response = await axios.put(API_URL + resource + '/' + id, data, config);
  return response.data;
};

export const deleteData = async (resource, id, config = {}) => {
  const response = await axios.delete(API_URL + resource + '/' + id, config);
  return response.data;
};
