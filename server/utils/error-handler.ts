/**
 * معالج الأخطاء المركزي
 */
import { TRPCError } from '@trpc/server';
import { logger } from './logger';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function handleError(error: unknown): TRPCError {
  // Log the error
  logger.error('Error occurred', { error });

  // Handle known errors
  if (error instanceof AppError) {
    return new TRPCError({
      code: error.statusCode === 401 ? 'UNAUTHORIZED' : 'BAD_REQUEST',
      message: error.message,
    });
  }

  if (error instanceof TRPCError) {
    return error;
  }

  // Handle unknown errors
  return new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'حدث خطأ غير متوقع',
  });
}

export function createError(
  statusCode: number,
  message: string
): AppError {
  return new AppError(statusCode, message);
}

// Common errors
export const errors = {
  unauthorized: () => createError(401, 'غير مصرح'),
  forbidden: () => createError(403, 'ممنوع'),
  notFound: (resource: string) => createError(404, `${resource} غير موجود`),
  badRequest: (message: string) => createError(400, message),
  tooManyRequests: () => createError(429, 'تم تجاوز الحد المسموح'),
  internal: () => createError(500, 'خطأ في الخادم'),
};
