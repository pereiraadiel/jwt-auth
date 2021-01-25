import { useHistory } from 'react-router-dom';
import React from 'react';
import auth from '../services/auth';

const Logout = () => {
  auth.logout();
  const history = useHistory();
  history.goBack();
  return <div></div>;
}

export default Logout;