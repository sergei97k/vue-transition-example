import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

axios.interceptors.response.use(
  response => response.data
);

export default axios;
