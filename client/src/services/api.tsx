import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3000"
}) as any;

console.log(api.baseURL);
export default api;