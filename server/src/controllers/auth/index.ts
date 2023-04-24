import { Router } from 'express';
import JwtTokenMiddleware from 'middlewares/jwt-token-middleware';
import register from './methods/register';
import login from './methods/login';
import auth from './methods/auth';
import updateUser from './methods/updateUser';
import setUserLike from './methods/userLiked';

const authController = Router();

authController.post('/register', register);

authController.post('/login', login);

authController.post('/auth', JwtTokenMiddleware, auth);

authController.post('/liked', JwtTokenMiddleware, setUserLike);

authController.put('/update-user', JwtTokenMiddleware, updateUser);

export default authController;
