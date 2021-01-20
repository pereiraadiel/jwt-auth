import jwt from 'jsonwebtoken';
import environment from './environment';

// const signOptions = {
//   algorithm: 'RS256',
//   expiresIn: environment.JWT.DURATION,
// }

const sign = (payload: any) => {
  return jwt.sign(
    payload,
    environment.JWT.PRIVATE_KEY as string,
    { // signOptions
      algorithm: 'RS256',
      expiresIn: environment.JWT.DURATION
    }
  );
};

const signRefreshToken = (payload: any) => {
  return jwt.sign(
    payload,
    environment.JWT.REFRESH_PRIVATE_KEY as string,
    { // signOptions
      algorithm: 'RS256',
      expiresIn: environment.JWT.REFRESH_DURATION
    }
  );
};

const verify = (token: string) => new Promise((resolve, reject) => {
  return jwt.verify(
    token,
    environment.JWT.PUBLIC_KEY as string,
    (error, data) => error ? reject(error): resolve(data),
  );
});

const verifyRefreshToken = (token: string) => new Promise((resolve, reject) => {
  return jwt.verify(
    token,
    environment.JWT.REFRESH_PUBLIC_KEY as string,
    (error, data) => error ? reject(error): resolve(data),
  );
});

export default {
  sign,
  verify,
  signRefreshToken,
  verifyRefreshToken
}