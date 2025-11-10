/**
 * Hook للتحقق من Media Queries
 */
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Breakpoints helpers
export const useIsSmall = () => useMediaQuery('(max-width: 640px)');
export const useIsMedium = () => useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
export const useIsLarge = () => useMediaQuery('(min-width: 1025px)');
