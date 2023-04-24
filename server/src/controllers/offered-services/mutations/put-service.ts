import { RequestHandler } from 'express';
import ServerSetupError from 'errors/server-setup-error';
import handleRequestError from 'helpers/handle-request-error';
import { SingleServiceViewModel, UpdateServiceBody } from '../types';
import ServiceModel from '../service-model';
import updateServiceModelValidationSchema from '../validation-schemas/update-service-model-validation-schema';

const putService: RequestHandler<
{},
SingleServiceViewModel | ErrorResponse,
UpdateServiceBody,
{}
> = async (req, res) => {
  try {
    if (req.authUser === undefined) throw new ServerSetupError();
    const serviceData = updateServiceModelValidationSchema.validateSync(req.body);

    const service = await ServiceModel.updateService(serviceData);
    res.status(200).json(service);
  } catch (error) {
    handleRequestError(error, res);
  }
};
export default putService;
