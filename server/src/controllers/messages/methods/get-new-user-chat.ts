import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import ServerSetupError from 'errors/server-setup-error';
import MessageModel from '../message-model';

const getNewUserChat: RequestHandler<
{},
ChatUser | ErrorResponse,
{},
{ id: string }
> = async (req, res) => {
  try {
    const { id } = req.query;
    if (req.authUser === undefined) throw new ServerSetupError();
    if (id === undefined) throw new Error();
    const chats = await MessageModel.getNewUserChat(Number(id));
    res.json(chats);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default getNewUserChat;
