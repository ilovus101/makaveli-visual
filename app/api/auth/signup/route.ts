import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/services/auth/passwordService';
import { SignupSchema } from '@/lib/validations';
import { apiResponse, errorResponse } from '@/lib/api';
import { sendEmail, emailTemplates } from '@/services/aws/sesService';
import { ConflictError, ValidationError } from '@/lib/errors';

/**
 * POST /api/auth/signup
 * Create a new user account
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = SignupSchema.safeParse(body);
    if (!result.success) {
      throw new ValidationError(
        'Validation failed',
        result.error.flatten().fieldErrors as Record<string, string[]>
      );
    }

    const { email, name, password } = result.data;

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'CUSTOMER',
        status: 'ACTIVE',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    // Send welcome email
    try {
      const template = emailTemplates.verifyEmail(
        name,
        `${process.env.NEXTAUTH_URL}/auth/verify?email=${email}`
      );
      await sendEmail(email, template.subject, template.htmlBody);
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      // Don't fail the signup if email fails
    }

    return NextResponse.json(
      apiResponse(
        true,
        { user },
        'Account created successfully'
      ),
      { status: 201 }
    );
  } catch (error) {
    return errorResponse(error);
  }
}
