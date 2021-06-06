import { useCallback, useEffect, useRef, useState, DependencyList } from 'react';
import { gifUrlRevoke } from './gif';

/**
 * Handle cleaning up objectURLs used for generated GIFs, etc
 */
export const useObjectUrl = (urlFn: () => string, deps: DependencyList) => {
  const [objUrl, setObjUrl] = useState<string>('');
  useEffect(() => {
    gifUrlRevoke(objUrl);
    setObjUrl(urlFn());
    // revoke url to clean up when element is destroyed
    return () => {
      setObjUrl('');
      gifUrlRevoke(objUrl);
    }
  }, deps);
  return objUrl;
}

const isTouchEvent = (e: Event): e is TouchEvent => 'touches' in e;

const preventDefaultTouchEvent = (e: Event) => {
  if (!isTouchEvent(e))
    return;
  if (e.touches.length < 2 && e.preventDefault)
    e.preventDefault();
};

/**
 * update state boolean whenever an element is hovered over for more than the given delay, in millisecends
 */
export const useLongHover = (delay: number) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const target = useRef<EventTarget>();
  const [isActive, setIsActive] = useState<boolean>(false);

  const start = useCallback((event: TouchEvent | MouseEvent) => {
    setIsActive(false);
    if (event.target) {
      event.target.addEventListener('touchend', preventDefaultTouchEvent, { passive: false });
      target.current = event.target;
    }
    timeout.current = setTimeout(() => setIsActive(true), delay);
  }, [delay]);

  const clear = useCallback(() => {
    setIsActive(false);
    if (timeout.current)
      clearTimeout(timeout.current);
    if (target.current)
      target.current.removeEventListener('touchend', preventDefaultTouchEvent);
  }, []);

  return [
    isActive,
    {
      onMouseEnter: (e: any) => start(e),
      onTouchStart: (e: any) => start(e),
      onMouseLeave: clear,
      onTouchEnd: clear,
    }
  ];
}