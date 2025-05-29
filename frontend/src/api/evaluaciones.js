import axios from 'axios';

const baseURL = 'http://localhost:3000'; // Replace with your backend URL

export const getAllEvaluaciones = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/evaluaciones`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getEvaluacionById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseURL}/evaluaciones/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createEvaluacion = async (evaluacion) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${baseURL}/evaluaciones`, evaluacion, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateEvaluacion = async (id, evaluacion) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${baseURL}/evaluaciones/${id}`, evaluacion, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteEvaluacion = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${baseURL}/evaluaciones/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};