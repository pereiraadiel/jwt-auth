import { Router } from 'express';
import authMiddlware from './middlewares/auth';
import UsersController from './controllers/UserController';

const routes = Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Hello World!"
  });
});

// Rotas que nao precisam de autenticacao
routes.post('/users', UsersController.create);
routes.post('/users/authenticate', UsersController.authenticate);
routes.post('/users/authenticate/refresh-token', UsersController.refresh_token);
routes.get('/users/:id', UsersController.show);

// Rotas que precisam de autenticacao
routes.put('/users/update/:id', authMiddlware, UsersController.update);
routes.put('/users/change_photo/:id', authMiddlware , UsersController.change_photo);
routes.delete('/users/:id', authMiddlware , UsersController.delete);

export default routes;