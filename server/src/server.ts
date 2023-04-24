import express from 'express';
import morgan from 'morgan';
import config from 'config';
import cors from 'cors';
import servicesRouter from 'controllers/offered-services';
import messagesController from 'controllers/messages';
import authController from './controllers/auth/index';
import DBService from './services/db-service';

const server = express();
server.use(cors());
server.use(morgan('tiny'));
server.use(express.static('public'));
server.use(express.json());

server.use('/api/auth', authController);
server.use('/api/services', servicesRouter);
server.use('/api/messages', messagesController);

DBService.connect(() => {
  server.listen(config.server.port, () => {
    console.log(`Server is running on ${config.server.address}`);
  });
});
