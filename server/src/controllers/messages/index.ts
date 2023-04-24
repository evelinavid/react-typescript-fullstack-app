import express from 'express';
import JwtTokenMiddleware from 'middlewares/jwt-token-middleware';
import getMessages from './methods/get-messages';
import addMessage from './methods/add-message';
import getAllUserChats from './methods/get-all-user-chats';
import getNewUserChat from './methods/get-new-user-chat';

const messagesController = express.Router();

messagesController.get('/', JwtTokenMiddleware, getMessages);

messagesController.post('/add', JwtTokenMiddleware, addMessage);
messagesController.get('/user-chats', JwtTokenMiddleware, getAllUserChats);
messagesController.get('/user-chat', JwtTokenMiddleware, getNewUserChat);

export default messagesController;
