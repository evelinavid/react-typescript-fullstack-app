import { RequestHandler } from 'express';
import { AuthResponse, Credentials } from '../types';
import credentialsValidationSchema from '../validation-schemas/credentials-validation-schema';
import UserModel from '../../../models/user-model';
import BcryptService from '../../../services/bcrypt-service';
import handleRequestError from '../../../helpers/handle-request-error';
import createAuthResponse from '../helpers/create-auth-response';

const login: RequestHandler<
{},
AuthResponse | ErrorResponse,
Partial<Credentials>,
{}
> = async (req, res) => {
  try {
    const credentials = credentialsValidationSchema.validateSync(req.body, { abortEarly: false });

    const userEntity = await UserModel.getUserByEmail(credentials.email);

    const passwordIsCorrect = BcryptService.compare(credentials.password, userEntity.password);
    if (!passwordIsCorrect) throw new Error('Invalid password');

    res.json(createAuthResponse(userEntity));
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default login;
