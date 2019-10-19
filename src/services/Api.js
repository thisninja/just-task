import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8282/'
});

export default instance;
