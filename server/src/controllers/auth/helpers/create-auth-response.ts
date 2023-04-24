import JwtTokenService from 'services/jwt-token-service';
import { AuthResponse } from '../types';

const createAuthResponse = ({ password, ...userViewModel }: UserEntity):AuthResponse => ({
  user: userViewModel,
  token: JwtTokenService.createToken({
    email: userViewModel.email,
    id: userViewModel.userId,
  }),
});

export default createAuthResponse;
