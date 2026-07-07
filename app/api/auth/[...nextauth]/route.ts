import NextAuth from 'next-auth';
import { authConfig } from '@/config/auth';

/**
 * NextAuth route handler
 * Handles authentication requests for signin, callback, logout, etc.
 */
const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
