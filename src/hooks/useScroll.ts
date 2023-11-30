import { useCallback, useRef } from 'react';

interface CustomDiv extends HTMLDivElement {
  timeoutId?: NodeJS.Timeout;
}

export const useScroll = () => {
  const scrollableRef = useRef<CustomDiv>(null);

  const handleScroll = useCallback(() => {
    if (scrollableRef.current) {
      scrollableRef.current.classList.add('show-scrollbar');
      if (scrollableRef.current.timeoutId) {
        clearTimeout(scrollableRef.current.timeoutId);
      }
      scrollableRef.current.timeoutId = setTimeout(function () {
        if (scrollableRef.current) {
          scrollableRef.current.classList.remove('show-scrollbar');
        }
      }, 500);
    }
  }, []);
  return { scrollableRef, handleScroll };
};
