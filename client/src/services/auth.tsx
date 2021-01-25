import api from './api';

const isAuthenticated = () => {
  const token = localStorage.getItem('jwtAuth-user');
  if(token) return true;
  return false;
}

const authenticate = (email: string, password: string) => {
  return api.post("/users/authenticate", {
    email,
    password
  })
  .then((response: any) => {
    if(response.data.accessToken){
      localStorage.setItem("jwtAuth-user", JSON.stringify(response.data));
    }
    return response.data;
  })
  .catch((err: any) => {
    return err;
  });
}

export default {
  isAuthenticated,
  authenticate
}