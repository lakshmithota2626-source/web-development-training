interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

/**
 * Sliding window rate limiter.
 * Supports public endpoints, authentication, and password resets.
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60
): Promise<{ allowed: boolean; remaining: number; resetInSeconds: number }> {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  
  let record = memoryStore.get(identifier);

  if (!record || now > record.resetTime) {
    record = {
      count: 1,
      resetTime: now + windowMs,
    };
    memoryStore.set(identifier, record);
    return {
      allowed: true,
      remaining: limit - 1,
      resetInSeconds: windowSeconds,
    };
  }

  if (record.count >= limit) {
    const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds,
    };
  }

  record.count += 1;
  const resetInSeconds = Math.ceil((record.resetTime - now) / 1000);
  return {
    allowed: true,
    remaining: limit - record.count,
    resetInSeconds,
  };
}
