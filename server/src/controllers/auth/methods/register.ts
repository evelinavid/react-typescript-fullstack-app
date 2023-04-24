import { RequestHandler } from 'express';
import { RegistrationBody, AuthResponse } from '../types';
import handleRequestError from '../../../helpers/handle-request-error';
import registrationBodyValidationSchema from '../validation-schemas/register-validation-schema';
import UserModel from '../../../models/user-model';
import createAuthResponse from '../helpers/create-auth-response';

const register: RequestHandler<
{},
AuthResponse | ErrorResponse,
Partial<RegistrationBody>,
{}
> = async (req, res) => {
  try {
    const {
      passwordConfirmation, ...userData
    } = registrationBodyValidationSchema.validateSync(req.body, { abortEarly: false });

    await UserModel.checkEmail(userData.email);
    const userEntity = await UserModel.createUser(userData);
    res.json(createAuthResponse(userEntity));
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default register;
