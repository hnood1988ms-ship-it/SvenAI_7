/**
 * Hook للتمرير التلقائي للأسفل
 */
import { useEffect, useRef } from 'react';

export function useScrollToBottom<T>(dependency: T) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [dependency]);

  return ref;
}
