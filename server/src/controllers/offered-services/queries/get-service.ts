import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import ServerSetupError from 'errors/server-setup-error';
import { SingleServiceViewModel } from '../types';
import ServiceModel from '../service-model';

const getService: RequestHandler<
{ id: string },
SingleServiceViewModel | ErrorResponse,
undefined,
{}
> = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === undefined) throw new ServerSetupError();
    const serviceViewModel = await ServiceModel.getSingleService(id);
    res.json(serviceViewModel);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default getService;
