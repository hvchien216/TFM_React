import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const userStorage = localStorage.getItem('user');
  const token = userStorage ? JSON.parse(userStorage).token : null;
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  config.headers['Accept'] = 'application/json';
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient; 