import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Input} from 'reakit';
import auth from '../../services/auth';
const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    setEmail(value);
  }
  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    setPassword(value);
  }

  async function handleSubmit(event: FormEvent){
    await auth.authenticate(email, password);
    if(auth.isAuthenticated()) {
      history.push('/');
    }
  }
  
  return (
    <div className="container">
      <h1>JWT Auth</h1>
      <Input 
        className="input"
        placeholder="E-mail" 
        type="email" 
        value={email} 
        onChange={handleEmailChange}
      />
      <Input 
        className="input" 
        placeholder="Senha"
        type="password" 
        value={password}
        onChange={handlePasswordChange}
      />
      <Button className="button" onClick={handleSubmit} >Entrar</Button>
      <Link to="/create-account">criar uma nova conta</Link>
      <Link to="/forgot-password" className="red">recuperar acesso</Link>
    </div>
  );
}

export default Login;