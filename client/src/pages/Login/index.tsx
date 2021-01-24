import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input} from 'reakit';
import "./style.css";

const Login = () => {
  return (
    <div className="login-container">
      <h1>JWT Auth</h1>
      <Input className="input" placeholder="E-mail" type="email"/>
      <Input className="input" placeholder="Senha" type="password"/>
      <Button className="button" >Entrar</Button>
      <Link to="/create-account">criar uma nova conta</Link>
      <Link to="/forgot-password" className="red">recuperar acesso</Link>
    </div>
  );
}

export default Login;