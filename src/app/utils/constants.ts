import dotenv from 'dotenv';
import { resolve } from 'path';

const environmment = process.env.ENVIRONMENT || 'local';

if (environmment === 'local') {
  const path = resolve(__dirname, `../../../environments/.env.${environmment}`);
  dotenv.config({ path });
} else {
  dotenv.config();
}

export const DATABASE = Object.freeze({
  NAME: process.env.APP_DATABASE_NAME,
  USER: process.env.APP_DATABASE_USER,
  PWD: process.env.APP_DATABASE_PWD,
  HOST: process.env.APP_DATABASE_HOST,
  PORT: Number.parseInt(process.env.APP_DATABASE_PORT),
  TYPE: process.env.APP_DATABASE_TYPE as any,
  SYNCHRONIZE: process.env.APP_DATABASE_SYNCHRONIZE === 'true',
  LOGGING: process.env.ENVIRONMENT === 'local',
  SCHEMA: process.env.APP_DATABASE_SCHEMA,
});
export const BASE_PATH = '/api/v1';
export const PAGINATION = Object.freeze({
  MAX_LIMIT_SIZE: 100,
  MIN_PAGE_SIZE: 0,
  MIN_START_PAGE: 1,
  DEFAULT_SORT: 'DESC',
});
export const RSA_OPTIONS = Object.freeze({
  EXPORT: {
    MODULUS_LENGTH: 4096,
    PRIVATE: {
      CIPHER: 'aes-256-cbc',
      FORMAT: 'pem',
      TYPE: 'pkcs8',
    },
    PUBLIC: {
      FORMAT: 'pem',
      TYPE: 'spki',
    },
    SIGN: {
      ALGORITHM: 'SHA256',
    },
  },
});
export enum Charset {
  NUMBERS = '0123456789',
  LOWERCASE = 'abcdefghijklmnopqrstuvwxyz',
  UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  SYMBOLS = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
}
export const CRYPTO_OPTIONS = Object.freeze({
  APP_CIPHER_KEY: process.env.APP_CIPHER_KEY,
  APP_CIPHER_IV: process.env.APP_CIPHER_IV,
  APP_CIPHER_METHOD: process.env.APP_CIPHER_METHOD,
});

export const JWT_OPTIONS = Object.freeze({
  ALGORITHM: 'HS256',
  EXPIRATION: '30m',
  ISS: 'nf-frelancer-api',
  VERSION: '4',
  SECRET: process.env.APP_JWT_SECRET_KEY,
  EXPIRATION_SEC: 1800,
});

export const MIN_TO_VALIDATE = Object.freeze({
  YEAR: 1970,
  ADD_FROM_CURRENT: 10,
});
