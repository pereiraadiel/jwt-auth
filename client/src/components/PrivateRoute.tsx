
import React from 'react';
import { Route, Redirect } from "react-router-dom";
import auth from '../services/auth';

const PrivateRoute = ({component: Component}: any, ...rest: any) => {
  return <Route {...rest} render={(props:any) => (
    auth.isAuthenticated() ? (
      <Component {...props} />
    ):(
        <Redirect to={{pathname:'/login', state: {from: props.location } }} />
      )
      )}/>
    }
    
export default PrivateRoute;