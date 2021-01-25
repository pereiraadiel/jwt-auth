import React, { ChangeEvent, useEffect, useState } from 'react';
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

  function handleChangeUserName(event: ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    const newUser = user;
    if(!newUser) return;
    newUser.name = value;
    setUser(newUser);
  }

  function handleChangeUserPhotoUrl(event: ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    const newUser = user;
    if(!newUser) return;
    newUser.photoUrl = value;
    setUser(newUser);
  }

  function handleChangeUserDesc(event: ChangeEvent<HTMLInputElement>){
    const value = event.target.value;
    const newUser = user;
    if(!newUser) return;
    newUser.description = value;
    setUser(newUser);
  }

  function handleSubmit () {
    if(!user) return;
    auth.saveUser(user)
      .then( (response: any) => {
        setUser(response);
      })
      .catch( (err: any) => {
        console.error(err);
        return;
      });
  }
  
  useEffect( () => {
    auth.getUser().then((data: any) => {
      setUser(data);
    }).catch((err: any) => {
      console.error(err);
      history.goBack();
    });
  }, [history]); 


  
  if(!user) {
    return (
      <div className="container">
        <h1>Carregando...</h1>
      </div>
    );
  }
    
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
        onChange={handleChangeUserName}
      />
      <Input 
        className="input" 
        placeholder="Photo URL" 
        type="url"
        defaultValue={user?.photoUrl}
        required
        onChange={handleChangeUserPhotoUrl}
      />
      <Input 
        className="input" 
        placeholder="Bio"
        defaultValue={user?.description}
        required
        onChange={handleChangeUserDesc}
      />
      <Button className="button" onClick={handleSubmit}>Salvar alterações</Button>
      <Link to="/logout" className="red">fazer logout</Link>
    </div>
  );
}

export default Home;