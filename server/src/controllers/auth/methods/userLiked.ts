import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import ServerSetupError from 'errors/server-setup-error';
import UserModel from 'models/user-model';

const setUserLike: RequestHandler<
{},
undefined | ErrorResponse,
{ serviceId: number },
{}
> = async (req, res) => {
  try {
    const { serviceId } = req.body;
    if (serviceId === undefined) throw new Error();
    if (req.authUser === undefined) throw new ServerSetupError();
    await UserModel.setUserLikes(req.authUser.userId, serviceId);
    res.status(201).send();
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default setUserLike;
