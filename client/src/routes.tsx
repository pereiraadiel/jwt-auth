import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';

import Login from './pages/Login';
import logout from './pages/Logout';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/" exact component={Home}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/logout" exact component={logout}/>
        <Route path="/forgot-password" exact component={ForgotPassword}/>
        <Route path="/reset-password" exact component={ResetPassword}/>
        <Route path="/create-account" exact component={Register}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;