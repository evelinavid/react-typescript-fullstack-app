import { RequestHandler } from 'express';
import ServerSetupError from 'errors/server-setup-error';
import { ServiceViewModel } from '../types';
import ServiceModel from '../service-model';

const getServices: RequestHandler<
{},
ServiceViewModel[],
undefined,
{}
> = async (req, res) => {
  if (req.authUser === undefined) throw new ServerSetupError();
  const servicesViewModel = await ServiceModel.getServicesCards(req.authUser.userId);
  res.json(servicesViewModel);
};

export default getServices;
