import { RequestHandler } from 'express';
import ServerSetupError from 'errors/server-setup-error';
import handleRequestError from 'helpers/handle-request-error';
import { SingleServiceViewModel } from '../types';
import ServiceModel from '../service-model';

const deleteService: RequestHandler<
{ id?: number },
SingleServiceViewModel | ErrorResponse,
{},
{}
> = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === undefined || req.authUser === undefined) throw new ServerSetupError();
    const serviceViewModel = await ServiceModel.getSingleService(id);

    await ServiceModel.deleteService(id);
    res.status(200).json(serviceViewModel);
  } catch (error) {
    handleRequestError(error, res);
  }
};
export default deleteService;
