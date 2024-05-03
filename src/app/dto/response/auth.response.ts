import { JWT_OPTIONS } from '@/utils/constants';
import { Expose, plainToInstance } from 'class-transformer';

export class AuthResponse {
  body: string;

  headers: unknown;

  @Expose({ name: 'isBase64Encoded' })
  is_base64_encoded: boolean;

  @Expose({ name: 'accessToken' })
  access_token: string;

  @Expose({ name: 'tokenType' })
  private static readonly token_type: string = 'Bearer';

  @Expose({ name: 'expiresIn' })
  private static readonly expires_in: number = JWT_OPTIONS.EXPIRATION_SEC;

  static create(isBase64Encoded: boolean, accessToken: string) {
    const tokenType = AuthResponse.token_type;
    const expiresIn = AuthResponse.expires_in;
    return plainToInstance(AuthResponse, {
      accessToken,
      isBase64Encoded,
      tokenType,
      expiresIn,
    });
  }
}
