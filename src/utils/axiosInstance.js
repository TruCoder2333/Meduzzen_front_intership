import axios from 'axios';
import store from '@/store/store'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    if (token && !config.url.endsWith('/auth/token/create/')) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default axiosInstance;