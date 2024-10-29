import axios, { InternalAxiosRequestConfig } from 'axios';

const URL = 'http://localhost:3000/api/v1/';

// const init = () => {
//   const token = localStorage.getItem('token');
//   const headers = {
//     Authorization: `Bearer ${token}`
//   };
//   return {
//     token,
//     headers
//   };
// };

const api = axios.create({
  baseURL: URL,
  headers: {
    // Authorization: `Bearer ${init().token}`
    'Content-Type': 'application/json'
  },
  timeout: 15000,
  responseType: 'json',
  method: 'GET'
});

// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig<any>) => {
//     if (!config.url?.includes('login'))
//       config.headers.Authorization = `Bearer ${init().token}`;

//     return config;
//   },
//   (error) => {
//     console.log('REQUEST ERROR');
//     console.error(error);
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('RESPONSE ERROR');
    console.error(error);
    return Promise.reject(error);
  }
);

export default api;
