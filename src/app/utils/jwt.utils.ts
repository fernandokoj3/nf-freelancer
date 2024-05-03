import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { JWT_OPTIONS } from '@/utils/constants';

export const decode = (token: string): JwtPayload => {
  return jwt.decode(token, { json: true }) as JwtPayload;
};

export const isValid = (token: string): boolean => {
  return !!jwt.verify(token, JWT_OPTIONS.SECRET, { ignoreExpiration: false });
};

export const verify = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      JWT_OPTIONS.SECRET,
      { ignoreExpiration: false },
      (err: JsonWebTokenError, decode: JwtPayload) => {
        if (err) {
          return reject(err);
        }
        return resolve(decode);
      },
    );
  });
};

export const encode = (
  payload: object,
  audience: string | string[],
  expiresIn = JWT_OPTIONS.EXPIRATION,
): string => {
  const now = Date.now();
  const claims = {
    token_use: 'access',
    iat: now,
    version: JWT_OPTIONS.VERSION,
    ...payload,
  };

  return jwt.sign(claims, JWT_OPTIONS.SECRET, {
    algorithm: JWT_OPTIONS.ALGORITHM,
    expiresIn,
    audience,
    issuer: JWT_OPTIONS.ISS,
  });
};
