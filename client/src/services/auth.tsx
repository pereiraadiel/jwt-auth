import api from './api';

export const  isAuthenticated = () => {
  const token = localStorage.getItem('sessionToken');
  if(token) return true;
  return false;
}

export const authenticate = (email: string, password: string) => {
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