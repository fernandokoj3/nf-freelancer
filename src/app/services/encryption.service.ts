import { Service } from 'typedi';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { CRYPTO_OPTIONS } from '@/utils/constants';

@Service()
export class EncryptionService {
  constructor() {}

  public encrypt(input: string): string {
    const cipher = crypto.createCipheriv(
      CRYPTO_OPTIONS.APP_CIPHER_METHOD,
      Buffer.from(CRYPTO_OPTIONS.APP_CIPHER_KEY, 'hex'),
      Buffer.from(CRYPTO_OPTIONS.APP_CIPHER_IV, 'hex'),
    );
    return Buffer.from(
      cipher.update(input, 'utf8', 'hex') + cipher.final('hex'),
    ).toString('base64');
  }

  public decrypt(input: string): string {
    const buff = Buffer.from(input, 'base64');
    const decipher = crypto.createDecipheriv(
      CRYPTO_OPTIONS.APP_CIPHER_METHOD,
      Buffer.from(CRYPTO_OPTIONS.APP_CIPHER_KEY, 'hex'),
      Buffer.from(CRYPTO_OPTIONS.APP_CIPHER_IV, 'hex'),
    );
    return (
      decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
      decipher.final('utf8')
    );
  }

  /**
   * Create safe simple hash for passords
   * @param password Password value
   * @returns Hash password
   */
  public hash(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  }

  /**
   * Compare simple password from hash method
   * @param plain Plain text to compare
   * @param hash Hash genereted
   * @returns Boolan result for matches
   */
  public compare(plain: string, hash: string): boolean {
    return bcrypt.compareSync(plain, hash);
  }
}
