import axios from 'axios';
import queryString from 'query-string';
import store from './../redux/store';
import { logoutUser } from './../redux/actions/userActions';
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  const userStorage = localStorage.getItem('user');
  const token = userStorage ? JSON.parse(userStorage).token : null;
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  config.headers['Accept'] = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response?.data?.error_code === 'token_not_valid') {
    store.dispatch(logoutUser());
  }
  if (response?.data) {
    return response.data;
  }

  return response;
}, (error) => {
  // Handle errors
  throw error;
});

export default axiosClient; 