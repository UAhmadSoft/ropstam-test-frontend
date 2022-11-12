import axios from 'axios';

const developmentUrl = 'http://localhost:5000/api';
const productionUrl = 'https://qasim-api.azurewebsites.net/api';

const url = developmentUrl;
// const url = productionUrl;

export const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? productionUrl : url;

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((req) => {
  // console.log('token', token);

  let token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
