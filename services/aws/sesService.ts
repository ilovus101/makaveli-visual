import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { env } from '@/config/env';

/**
 * Initialize SES client
 */
const sesClient = new SESClient({
  region: env.AWS_SES_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

const FROM_EMAIL = process.env.SES_FROM_EMAIL || 'noreply@makaveli.visual';

/**
 * Send email via Amazon SES
 * @param to - Recipient email
 * @param subject - Email subject
 * @param htmlBody - HTML email body
 * @param textBody - Plain text email body (optional)
 */
export async function sendEmail(
  to: string,
  subject: string,
  htmlBody: string,
  textBody?: string
): Promise<void> {
  try {
    await sesClient.send(
      new SendEmailCommand({
        Source: FROM_EMAIL,
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Subject: {
            Data: subject,
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: htmlBody,
              Charset: 'UTF-8',
            },
            ...(textBody && {
              Text: {
                Data: textBody,
                Charset: 'UTF-8',
              },
            }),
          },
        },
      })
    );
  } catch (error) {
    console.error('SES email error:', error);
    throw new Error('Failed to send email');
  }
}

/**
 * Send batch emails
 * @param recipients - Array of recipient emails
 * @param subject - Email subject
 * @param htmlBody - HTML email body
 */
export async function sendBatchEmail(
  recipients: string[],
  subject: string,
  htmlBody: string
): Promise<void> {
  try {
    const promises = recipients.map((email) =>
      sendEmail(email, subject, htmlBody)
    );

    await Promise.all(promises);
  } catch (error) {
    console.error('SES batch email error:', error);
    throw new Error('Failed to send batch emails');
  }
}

/**
 * Email templates
 */
export const emailTemplates = {
  /**
   * Account verification email
   */
  verifyEmail: (userName: string, verificationLink: string) => ({
    subject: 'Verify Your Makaveli Visual Account',
    htmlBody: `
      <h1>Welcome to Makaveli Visual!</h1>
      <p>Hi ${userName},</p>
      <p>Please verify your email address to complete your account setup.</p>
      <a href="${verificationLink}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #D4AF37;
        color: #111111;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
      ">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `,
    textBody: `Verify your email: ${verificationLink}`,
  }),

  /**
   * Password reset email
   */
  resetPassword: (userName: string, resetLink: string) => ({
    subject: 'Reset Your Makaveli Visual Password',
    htmlBody: `
      <h1>Password Reset Request</h1>
      <p>Hi ${userName},</p>
      <p>We received a request to reset your password.</p>
      <a href="${resetLink}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #D4AF37;
        color: #111111;
        text-decoration: none;
        border-radius: 4px;
        font-weight: bold;
      ">Reset Password</a>
      <p>This link expires in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
    textBody: `Reset your password: ${resetLink}`,
  }),

  /**
   * Order confirmation email
   */
  orderConfirmation: (userName: string, orderNumber: string, total: string) => ({
    subject: `Order Confirmation - #${orderNumber}`,
    htmlBody: `
      <h1>Order Confirmed!</h1>
      <p>Hi ${userName},</p>
      <p>Thank you for your order!</p>
      <p><strong>Order Number:</strong> ${orderNumber}</p>
      <p><strong>Total Amount:</strong> ${total}</p>
      <p>We'll notify you when your order ships.</p>
    `,
    textBody: `Order ${orderNumber} confirmed. Total: ${total}`,
  }),

  /**
   * Quote request email
   */
  quoteRequest: (userName: string, quoteNumber: string) => ({
    subject: `Quote Request Received - #${quoteNumber}`,
    htmlBody: `
      <h1>Quote Request Received</h1>
      <p>Hi ${userName},</p>
      <p>We've received your quote request (#${quoteNumber}).</p>
      <p>Our team will review it and get back to you soon.</p>
    `,
    textBody: `Quote request ${quoteNumber} received.`,
  }),
};
