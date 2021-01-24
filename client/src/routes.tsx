import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';

import Login from './pages/Login';
import Register from './pages/Register';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact />
        <Route path="/login" exact component={Login}/>
        <Route path="/forgot-password" exact component={ForgotPassword}/>
        <Route path="/create-account" exact component={Register}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;