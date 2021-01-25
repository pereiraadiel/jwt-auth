import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3333"
}) as any;

console.log(api.baseURL);
export default api;