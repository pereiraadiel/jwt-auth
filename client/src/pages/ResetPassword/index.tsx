import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input} from 'reakit';

const ForgotPassword = () => {
  return (
    <div className="container">
      <h1>JWT Auth</h1>
      <Input className="input" placeholder="Nova senha" type="password"/>
      <Button className="button" >Alterar senha</Button>
      <Link to="/login">fazer login</Link>
    </div>
  );
}

export default ForgotPassword;