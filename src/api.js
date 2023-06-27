import axios from 'axios';

const api = axios.create({
  baseURL: 'https://hitema-maxairain-api.onrender.com/',
});

export default api;
