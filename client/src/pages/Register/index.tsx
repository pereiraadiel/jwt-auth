import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input} from 'reakit';

const Register = () => {
  return (
    <div className="container">
      <h1>JWT Auth</h1>
      <Input className="input" placeholder="Name" type="text"/>
      <Input className="input" placeholder="E-mail" type="email"/>
      <Input className="input" placeholder="Password" type="password"/>
      <Input className="input" placeholder="Photo URL" type="url"/>
      <textarea className="input" placeholder="Bio"/>
      <Button className="button" >Cadastrar</Button>
      <Link to="/login">fazer login</Link>
    </div>
  );
}

export default Register;