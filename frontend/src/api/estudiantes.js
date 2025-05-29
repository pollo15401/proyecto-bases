import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Replace with your backend URL

export const getAllEstudiantes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/estudiantes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getEstudianteById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/estudiantes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createEstudiante = async (estudiante) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseURL}/estudiantes`, estudiante, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateEstudiante = async (id, estudiante) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${baseURL}/estudiantes/${id}`, estudiante, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteEstudiante = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${baseURL}/estudiantes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};