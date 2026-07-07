/**
 * Common error responses for API routes
 */
export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code: string = 'INTERNAL_ERROR'
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/**
 * Validation error for form inputs
 */
export class ValidationError extends AppError {
  public fieldErrors: Record<string, string[]> = {};

  constructor(message: string, fieldErrors?: Record<string, string[]>) {
    super(message, 400, 'VALIDATION_ERROR');
    this.fieldErrors = fieldErrors || {};
  }
}

/**
 * Authentication error
 */
export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

/**
 * Authorization error
 */
export class AuthorizationError extends AppError {
  constructor(message: string = 'Not authorized') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

/**
 * Not found error
 */
export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

/**
 * Conflict error
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409, 'CONFLICT');
  }
}

/**
 * Rate limit error
 */
export class RateLimitError extends AppError {
  constructor(retryAfter: number = 60) {
    super('Too many requests', 429, 'RATE_LIMIT');
    this.statusCode = 429;
  }
}
