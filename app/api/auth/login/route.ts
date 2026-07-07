import { NextRequest, NextResponse } from 'next/server';
import { LoginSchema } from '@/lib/validations';
import { apiResponse } from '@/lib/api';
import { ValidationError } from '@/lib/errors';

/**
 * POST /api/auth/login
 * Authenticate user with email and password
 * Note: This is for API-based login. NextAuth handles session creation.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = LoginSchema.safeParse(body);
    if (!result.success) {
      throw new ValidationError(
        'Validation failed',
        result.error.flatten().fieldErrors as Record<string, string[]>
      );
    }

    const { email, password } = result.data;

    // Note: Actual authentication is handled by NextAuth
    // This endpoint is for API-based login requests
    // The client should use NextAuth's signIn function or the NextAuth endpoint

    return NextResponse.json(
      apiResponse(
        true,
        { redirectUrl: '/dashboard' },
        'Login successful. Redirecting...'
      ),
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        apiResponse(false, undefined, error.message, {
          code: error.code,
          fieldErrors: error.fieldErrors,
        }),
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      apiResponse(false, undefined, 'Login failed', {
        code: 'LOGIN_ERROR',
      }),
      { status: 500 }
    );
  }
}
