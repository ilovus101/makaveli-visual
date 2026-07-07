import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ForgotPasswordSchema } from '@/lib/validations';
import { apiResponse, errorResponse } from '@/lib/api';
import { sendEmail, emailTemplates } from '@/services/aws/sesService';
import { ValidationError } from '@/lib/errors';
import { generateRandomString } from '@/lib/utils';

/**
 * POST /api/auth/forgot-password
 * Send password reset email
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = ForgotPasswordSchema.safeParse(body);
    if (!result.success) {
      throw new ValidationError(
        'Validation failed',
        result.error.flatten().fieldErrors as Record<string, string[]>
      );
    }

    const { email } = result.data;

    // Find user
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists for security
      return NextResponse.json(
        apiResponse(
          true,
          {},
          'If an account exists, a password reset email has been sent'
        ),
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = generateRandomString(32);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store verification token
    await db.verificationToken.create({
      data: {
        identifier: email,
        token: resetToken,
        expires: expiresAt,
      },
    });

    // Send reset email
    const resetLink = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;
    const template = emailTemplates.resetPassword(user.name, resetLink);
    await sendEmail(email, template.subject, template.htmlBody);

    return NextResponse.json(
      apiResponse(
        true,
        {},
        'Password reset email sent'
      ),
      { status: 200 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}
