import { IsDefined, IsEmail, IsString } from 'class-validator';

export class AuthRequest {
  @IsDefined()
  @IsString()
  @IsEmail()
  login: string;

  @IsDefined()
  @IsString()
  password: string;
}

export class TokenRequest {
  @IsDefined()
  authorization: string;
}
