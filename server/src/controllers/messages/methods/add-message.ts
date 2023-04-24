import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import ServerSetupError from 'errors/server-setup-error';
import MessageModel from '../message-model';

const addMessage: RequestHandler<
{},
undefined | ErrorResponse,
{ receiverId: number, text: string },
{}
> = async (req, res) => {
  try {
    const { receiverId, text } = req.body;
    if (receiverId === undefined) throw new Error();
    if (text === undefined) throw new Error();
    if (req.authUser === undefined) throw new ServerSetupError();
    await MessageModel.addMessage(req.authUser.userId, receiverId, text);
    res.status(201).send();
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default addMessage;
