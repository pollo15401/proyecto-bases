import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Replace with your backend URL

export const getAllAsistencias = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/asistencias`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAsistenciaById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/asistencias/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createAsistencia = async (asistencia) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseURL}/asistencias`, asistencia, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateAsistencia = async (id, asistencia) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${baseURL}/asistencias/${id}`, asistencia, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteAsistencia = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${baseURL}/asistencias/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};