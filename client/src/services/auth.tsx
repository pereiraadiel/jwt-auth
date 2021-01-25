import api from './api';

// interface jwtAuthUser {
//   id: string,
//   accessToken: string,
//   refreshToken: string,
// }

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
  const accessToken = localStorage.getItem("jwtAuth-user-accessToken")?.replaceAll("\"", '');
  const refreshToken = localStorage.getItem("jwtAuth-user-refreshToken")?.replaceAll("\"", '');
  
  const jwtAuth_user = {
    id,
    accessToken,
    refreshToken
  }

  if(!jwtAuth_user) return {};

  console.log(jwtAuth_user);
  
  return api.get(`/users/${jwtAuth_user.id}`)
    .then((response: any) => {
      // console.log(response.data);
      return response.data;
    }).catch((err: any) => {
      return {}
    });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  isAuthenticated,
  authenticate,
  getUser
}