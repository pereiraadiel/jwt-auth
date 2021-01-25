import api from './api';

interface User {
  id: string,
  name: string,
  description: string,
  photoUrl: string,
}

const isAuthenticated = () => {
  const token = localStorage.getItem('jwtAuth-user-accessToken');
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
      localStorage.setItem("jwtAuth-user-accessToken", JSON.stringify(response.data.accessToken));
      localStorage.setItem("jwtAuth-user-refreshToken", JSON.stringify(response.data.refreshToken));
      localStorage.setItem("jwtAuth-user-id", JSON.stringify(response.data.id));
    }
    return response.data;
  })
  .catch((err: any) => {
    return err;
  });
}

const getUser = () => {
  const id = localStorage.getItem("jwtAuth-user-id")?.replaceAll("\"", '');
  
  return api.get(`/users/${id}`)
    .then((response: any) => {
      // console.log(response.data);
      return response.data;
    }).catch((err: any) => {
      return {}
    });
}

const saveUser = (user: User) => {
  const id = localStorage.getItem("jwtAuth-user-id")?.replaceAll("\"", '');
  const accessToken = localStorage.getItem("jwtAuth-user-accessToken")?.replaceAll("\"", '');

  return api.put(`/users/update/${id}`, user ,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then( (response: any) => {
    return response.data;
  }).catch((err: any) => {
    console.error(err);
    return {};
  });
}

const logout = () => {
  localStorage.removeItem("jwtAuth-user-id");
  localStorage.removeItem("jwtAuth-user-accessToken");
  localStorage.removeItem("jwtAuth-user-refreshToken");
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  isAuthenticated,
  authenticate,
  getUser,
  saveUser,
  logout,
}