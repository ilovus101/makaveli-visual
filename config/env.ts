/**
 * Environment variables configuration
 * Validates and exports all environment variables used in the application
 */

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value || defaultValue || '';
};

export const env = {
  // Node environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  DATABASE_URL: getEnv('DATABASE_URL'),
  
  // NextAuth
  NEXTAUTH_URL: getEnv('NEXTAUTH_URL'),
  NEXTAUTH_SECRET: getEnv('NEXTAUTH_SECRET'),
  
  // AWS Configuration
  AWS_ACCESS_KEY_ID: getEnv('AWS_ACCESS_KEY_ID'),
  AWS_SECRET_ACCESS_KEY: getEnv('AWS_SECRET_ACCESS_KEY'),
  AWS_REGION: getEnv('AWS_REGION', 'us-east-1'),
  AWS_S3_BUCKET: getEnv('AWS_S3_BUCKET'),
  AWS_SES_REGION: getEnv('AWS_SES_REGION', 'us-east-1'),
  
  // App Configuration
  APP_URL: getEnv('APP_URL', 'http://localhost:3000'),
  API_URL: getEnv('API_URL', 'http://localhost:3000/api'),
} as const;

/**
 * Validate environment on startup
 */
export function validateEnv() {
  try {
    Object.values(env);
    return true;
  } catch (error) {
    console.error('Environment validation failed:', error);
    process.exit(1);
  }
}
