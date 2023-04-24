import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import ServerSetupError from 'errors/server-setup-error';
import MessageModel from '../message-model';

const getAllUserChats: RequestHandler<
{},
ChatUser[] | ErrorResponse,
{},
{}
> = async (req, res) => {
  try {
    if (req.authUser === undefined) throw new ServerSetupError();
    const chats = await MessageModel.getAllUserChats(req.authUser.userId);
    res.json(chats);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default getAllUserChats;
