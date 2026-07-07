/**
 * TypeScript type definitions for the application
 */

/**
 * User role type
 */
export type UserRole = 'ADMIN' | 'CUSTOMER' | 'VENDOR';

/**
 * User status type
 */
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

/**
 * Order status type
 */
export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

/**
 * Quote status type
 */
export type QuoteStatus =
  | 'PENDING'
  | 'SENT'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'EXPIRED';

/**
 * Payment status type
 */
export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESSFUL'
  | 'FAILED'
  | 'REFUNDED';

/**
 * Payment provider type
 */
export type PaymentProvider = 'PAYSTACK' | 'STRIPE';

/**
 * User entity
 */
export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: Date | null;
  phone?: string;
  company?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Product entity
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  basePrice: number;
  categoryId: string;
  stock: number;
  isInStock: boolean;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Order entity
 */
export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  status: OrderStatus;
  shippingAddressId?: string;
  billingAddressId?: string;
  paymentId?: string;
  trackingNumber?: string;
  notes?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Quote entity
 */
export interface Quote {
  id: string;
  quoteNumber: string;
  userId: string;
  total: number;
  status: QuoteStatus;
  expiresAt: Date;
  convertedToOrderId?: string;
  customDetails?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Payment entity
 */
export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  provider: PaymentProvider;
  transactionId?: string;
  reference?: string;
  userId: string;
  metadata?: Record<string, any>;
  failureReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * API Response type
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message?: string;
    fieldErrors?: Record<string, string[]>;
  };
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * NextAuth session type
 */
export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  };
  expires: string;
}
