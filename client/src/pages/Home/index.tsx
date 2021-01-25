import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Input} from 'reakit';
import auth from '../../services/auth';

interface User {
  id: string,
  name: string,
  description: string,
  photoUrl: string,
}

const Home = () => {
  const history = useHistory();
  const [user, setUser] = useState<User>()
  useEffect( () => {
    auth.getUser().then((data: any) => {
      setUser(data);
    }).catch((err: any) => {
      console.error(err);
      history.goBack();
    });
  }, []); 
  
  if(!user) {
    return (
      <div className="container">
        <h1>Carregando...</h1>
      </div>
    );
  }
    
      
  console.log("USUARIO>:>:>",user);
  return (
    <div className="container">
      <h1>JWT Auth</h1>
      <img src={user?.photoUrl} alt="foto de perfil"/>
      <Input 
        className="input" 
        placeholder="Name" 
        type="text"
        defaultValue={user?.name}
        required
      />
      <Input 
        className="input" 
        placeholder="Photo URL" 
        type="url"
        defaultValue={user?.photoUrl}
        required
      />
      <textarea 
        className="input" 
        placeholder="Bio"
        defaultValue={user?.description}
        required
      />
      <Button className="button" >Salvar alterações</Button>
      <Link to="/login" className="red">fazer logout</Link>
    </div>
  );
}

export default Home;