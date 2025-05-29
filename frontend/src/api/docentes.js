import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Replace with your backend URL

export const getAllDocentes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/docentes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getDocenteById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/docentes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createDocente = async (docente) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseURL}/docentes`, docente, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateDocente = async (id, docente) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${baseURL}/docentes/${id}`, docente, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteDocente = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${baseURL}/docentes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};