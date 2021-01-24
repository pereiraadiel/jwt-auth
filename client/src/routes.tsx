import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login}/>
        <PrivateRoute path="/" exact />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;