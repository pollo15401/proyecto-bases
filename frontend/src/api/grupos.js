import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Replace with your backend URL

export const getAllGrupos = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/grupos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getGrupoById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/grupos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createGrupo = async (grupo) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseURL}/grupos`, grupo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateGrupo = async (id, grupo) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${baseURL}/grupos/${id}`, grupo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteGrupo = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${baseURL}/grupos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};