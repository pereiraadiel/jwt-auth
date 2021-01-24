import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input} from 'reakit';

const Home = () => {
  return (
    <div className="container">
      <h1>JWT Auth</h1>
      <img src="" alt="foto de perfil"/>
      <Input className="input" placeholder="Name" type="text"/>
      <Input className="input" placeholder="Photo URL" type="url"/>
      <textarea className="input" placeholder="Bio"/>
      <Button className="button" >Salvar alterações</Button>
      <Link to="/login" className="red">fazer logout</Link>
    </div>
  );
}

export default Home;