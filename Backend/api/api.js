import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const api = {
  validateCredentials: (data) => axios.post(`${BASE_URL}/validate`, data).then((res) => res.data),
  executeQuery: (data) => axios.post(`${BASE_URL}/query`, data).then((res) => res.data),
};

export default api;
