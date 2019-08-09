import { useEffect } from 'react';

export default function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        
        event.stopPropagation();
        handler(event);
      };

      document.addEventListener('click', listener);
      // document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('click', listener);
        // document.removeEventListener('touchstart', listener);
      };
    },
    [ref, handler]
  );
}