import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input} from 'reakit';

const ForgotPassword = () => {
  return (
    <div className="container">
      <h1>JWT Auth</h1>
      <Input className="input" placeholder="E-mail" type="email"/>
      <Button className="button" >Recuperar acesso</Button>
      <Link to="/login">fazer login</Link>
    </div>
  );
}

export default ForgotPassword;