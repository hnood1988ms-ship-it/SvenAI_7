/**
 * Hook محسّن لـ tRPC queries مع caching ذكي
 */
import { useEffect, useRef } from 'react';

export function useOptimizedQuery<T>(
  queryFn: () => T,
  deps: any[] = [],
  options?: {
    staleTime?: number;
    cacheTime?: number;
  }
) {
  const cacheRef = useRef<{
    data: T | null;
    timestamp: number;
  }>({ data: null, timestamp: 0 });

  const staleTime = options?.staleTime ?? 5000; // 5 seconds default

  useEffect(() => {
    const now = Date.now();
    const isStale = now - cacheRef.current.timestamp > staleTime;

    if (!cacheRef.current.data || isStale) {
      const result = queryFn();
      cacheRef.current = {
        data: result,
        timestamp: now,
      };
    }
  }, deps);

  return cacheRef.current.data;
}
