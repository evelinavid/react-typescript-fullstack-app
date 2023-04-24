import { RequestHandler } from 'express';
import ServerSetupError from 'errors/server-setup-error';
import handleRequestError from 'helpers/handle-request-error';
import serviceModelValidationSchema from '../validation-schemas/service-model-validation-schema';
import ServiceModel from '../service-model';
import { SingleServiceBody, SingleServiceViewModel } from '../types';

const createService: RequestHandler<
{},
SingleServiceViewModel | ErrorResponse,
SingleServiceBody,
{}
> = async (req, res) => {
  try {
    if (req.authUser === undefined) throw new ServerSetupError();
    const serviceData = serviceModelValidationSchema.validateSync(req.body);

    const serviceViewModel = await ServiceModel.createService(serviceData, req.authUser.userId);

    res.status(201).json(serviceViewModel);
  } catch (error) {
    handleRequestError(error, res);
  }
};
export default createService;
