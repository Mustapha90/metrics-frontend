import axios from 'axios';

const host = process.env.REACT_APP_BE_HOST;
const port = process.env.REACT_APP_BE_PORT;

const api = axios.create({
  baseURL: `http://${host}:${port}`,
});

export default api;
