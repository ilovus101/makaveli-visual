import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/services/auth/passwordService';
import { ResetPasswordSchema } from '@/lib/validations';
import { apiResponse, errorResponse } from '@/lib/api';
import { ValidationError, AppError } from '@/lib/errors';

/**
 * POST /api/auth/reset-password
 * Reset user password with token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, email } = body;

    if (!token || !email) {
      throw new ValidationError('Token and email are required');
    }

    // Validate password
    const result = ResetPasswordSchema.safeParse({
      password: body.password,
      confirmPassword: body.confirmPassword,
    });

    if (!result.success) {
      throw new ValidationError(
        'Validation failed',
        result.error.flatten().fieldErrors as Record<string, string[]>
      );
    }

    // Verify token
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        identifier: email,
        token,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!verificationToken) {
      throw new AppError('Invalid or expired reset token', 400, 'INVALID_TOKEN');
    }

    // Hash new password
    const hashedPassword = await hashPassword(result.data.password);

    // Update user password
    await db.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Delete used token
    await db.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token,
        },
      },
    });

    return NextResponse.json(
      apiResponse(true, {}, 'Password reset successful'),
      { status: 200 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}
