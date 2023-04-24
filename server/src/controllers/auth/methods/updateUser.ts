import { RequestHandler } from 'express';
import UserModel from 'models/user-model';
import { AuthResponse, UserUpdate } from '../types';
import handleRequestError from '../../../helpers/handle-request-error';
import ServerSetupError from '../../../errors/server-setup-error';
import userUpdateValidationSchema from '../validation-schemas/user-update-validation-schema';
import createAuthResponse from '../helpers/create-auth-response';

const updateUser: RequestHandler<
{},
AuthResponse | ErrorResponse,
UserUpdate,
{}
> = async (req, res) => {
  try {
    if (req.authUser === undefined) throw new ServerSetupError();
    const data = userUpdateValidationSchema.validateSync(req.body);

    const user = await UserModel.updateUser(data, req.authUser.userId);
    res.json(createAuthResponse(user));
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default updateUser;
