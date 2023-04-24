import jwt from 'jsonwebtoken';
import config from 'config';

type TokenData = {
  email:string,
  id:number
};

type DecodedTokenData = TokenData & {
  iat:number,
  exp:number
};

const createToken = (data:TokenData) => jwt.sign(data, config.token.secret, {
  expiresIn: config.token.expiration,
});

const decode = (token:string) => {
  const decodedData = jwt.decode(token);
  if (decodedData === null) return null;
  return decodedData as DecodedTokenData;
};

const JwtTokenService = {
  createToken,
  decode,
};

export default JwtTokenService;
