import React from 'react';
import { Button, Input} from 'reakit';
import "./style.css";

const Login = () => {
  return (
    <div className="login-container">
      <h1>JWT Auth</h1>
      <Input className="input" placeholder="E-mail" type="email"/>
      <Input className="input" placeholder="Senha" type="password"/>
      <Button className="button" >Entrar</Button>
      <a href="/create-account">criar uma nova conta</a>
      <a href="/forgot-password" className="red">recuperar acesso</a>
    </div>
  );
}

export default Login;