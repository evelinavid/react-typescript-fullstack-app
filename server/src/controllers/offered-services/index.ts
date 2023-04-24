import express from 'express';
import JwtTokenMiddleware from 'middlewares/jwt-token-middleware';
import getServices from './queries/get-services';
import getService from './queries/get-service';
import createService from './mutations/create-service';
import getUserServices from './queries/get-user-services';
import putService from './mutations/put-service';
import deleteService from './mutations/delete-service';

const servicesRouter = express.Router();

servicesRouter.get('/', JwtTokenMiddleware, getServices);
servicesRouter.get('/profile', JwtTokenMiddleware, getUserServices);
servicesRouter.get('/:id', getService);

servicesRouter.post('/create', JwtTokenMiddleware, createService);
servicesRouter.put('/update', JwtTokenMiddleware, putService);
servicesRouter.delete('/delete/:id', JwtTokenMiddleware, deleteService);
export default servicesRouter;
