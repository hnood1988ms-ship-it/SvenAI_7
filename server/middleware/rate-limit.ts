/**
 * Rate Limiting Middleware
 */
import { TRPCError } from '@trpc/server';
import { rateLimiter } from '../utils/rate-limiter';
import { logger } from '../utils/logger';

export function createRateLimitMiddleware(
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000
) {
  return async function rateLimitMiddleware(opts: any) {
    const { ctx, next } = opts;
    
    // Get identifier (user ID or IP)
    const identifier = ctx.user?.id?.toString() || ctx.req.ip || 'anonymous';
    
    // Check rate limit
    const result = rateLimiter.check(identifier);
    
    if (!result.allowed) {
      logger.warn('Rate limit exceeded', { identifier });
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: 'تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.',
      });
    }
    
    // Add rate limit info to context
    ctx.rateLimit = {
      remaining: result.remaining,
      resetAt: result.resetAt,
    };
    
    return next();
  };
}
