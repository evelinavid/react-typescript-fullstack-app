import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import ServerSetupError from 'errors/server-setup-error';
import MessageModel from '../message-model';

const getMessages: RequestHandler<
{},
MessageEntity[] | ErrorResponse,
{ },
{ receiverId: string }
> = async (req, res) => {
  try {
    const { receiverId } = req.query;
    if (receiverId === undefined) throw new Error();
    if (req.authUser === undefined) throw new ServerSetupError();

    const messages = await MessageModel.getChatMessages(Number(receiverId), req.authUser?.userId);
    res.json(messages);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default getMessages;
