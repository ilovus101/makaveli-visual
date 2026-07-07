import { NextRequest, NextResponse } from 'next/server';
import { apiResponse } from '@/lib/api';

/**
 * POST /api/auth/logout
 * Logout the current user
 * Note: Client should use signOut() from next-auth/react
 */
export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      apiResponse(true, {}, 'Logged out successfully'),
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      apiResponse(false, undefined, 'Logout failed', {
        code: 'LOGOUT_ERROR',
      }),
      { status: 500 }
    );
  }
}
