import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Substituir pelo ip do emulador
});

export default api;
