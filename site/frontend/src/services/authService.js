import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email, mot_de_passe) => {
  try {
    const response = await api.post('/api/login', {
      email,
      mot_de_passe,
    });
    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur de connexion');
  }
};

export const signup = async (nom, email, mot_de_passe) => {
  try {
    const response = await api.post('/api/signup', {
      nom,
      email,
      mot_de_passe,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    throw new Error('Impossible de vérifier la santé de l\'API');
  }
};
