import { RequestHandler } from 'express';
import ServerSetupError from 'errors/server-setup-error';
import handleRequestError from 'helpers/handle-request-error';
import { UserServiceData } from '../types';
import ServiceModel from '../service-model';

const getUserServices: RequestHandler<
{},
UserServiceData[] | ErrorResponse,
undefined,
{}
> = async (req, res) => {
  try {
    if (req.authUser === undefined) throw new ServerSetupError();

    const servicesViewModel = await ServiceModel.getUserServices(req.authUser.userId);

    res.status(200).json(servicesViewModel);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default getUserServices;
