import { HttpStatusCode } from '@/domain/verbs';

export class BaseError extends Error {
  constructor(
    public readonly code: number,
    public readonly message: string,
    public readonly field?: string,
  ) {
    super(message);
  }
}
export class SchemaValidationError {
  constructor(
    public readonly code: number | string,
    public readonly messages: string[],
    public readonly fieldName: string,
  ) {}
}

export class PreConditionFailedException extends BaseError {}
export class InvalidScopeException extends BaseError {}
export class ForbiddenException extends BaseError {
  constructor(message: string, field?: string) {
    super(HttpStatusCode.FORBIDDEN, message, field);
  }
}
export class UnauthorizedException extends BaseError {
  constructor(message: string, field?: string) {
    super(HttpStatusCode.UNAUTHORIZED, message, field);
  }
}
export class InvalidGrantTypeException extends BaseError {}
export class SetupErrorException extends BaseError {
  constructor(message: string, field?: string) {
    super(HttpStatusCode.BAD_REQUEST, message, field);
  }
}
export class ScopeAlreadyExistsException extends BaseError {}
export class ScopeFoundException extends BaseError {}
export class NotFoundException extends BaseError {
  constructor(message: string, field?: string) {
    super(HttpStatusCode.NOT_FOUND, message, field);
  }
}
export class FileNotSupportException extends BaseError {
  constructor(message: string, field?: string) {
    super(HttpStatusCode.BAD_REQUEST, message, field);
  }
}

export class FileErrorException extends BaseError {
  constructor(message: string, field?: string) {
    super(HttpStatusCode.BAD_REQUEST, message, field);
  }
}

export class ErrorCreatingToken extends BaseError {
  constructor(message: string, field?: string) {
    super(HttpStatusCode.BAD_REQUEST, message, field);
  }
}

export class PasswordException extends BaseError {
  constructor(message: string, field?: string) {
    super(HttpStatusCode.BAD_REQUEST, message, field);
  }
}

export class BadRequest extends BaseError {
  constructor(message: string, field?: string) {
    super(HttpStatusCode.BAD_REQUEST, message, field);
  }
}
