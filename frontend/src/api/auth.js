import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Replace with your backend URL

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const register = async (name, username, password) => {
  try {
    const response = await axios.post(`${baseURL}/auth/register`, { name, username, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};