import { useCallback, useRef, useState } from 'react';

const isTouchEvent = (e: Event): e is TouchEvent => {
  return 'touches' in e;
};

const preventDefault = (e: Event) => {
  if (!isTouchEvent(e))
    return;
  if (e.touches.length < 2 && e.preventDefault)
    e.preventDefault();
};

export const useLongHover = (delay: number) => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const target = useRef<EventTarget>();
  const [isActive, setIsActive] = useState<boolean>(false);

  const start = useCallback((event: TouchEvent | MouseEvent) => {
    setIsActive(false);
    if (event.target) {
      event.target.addEventListener('touchend', preventDefault, { passive: false });
      target.current = event.target;
    }
    timeout.current = setTimeout(() => setIsActive(true), delay);
  }, [delay]);

  const clear = useCallback(() => {
    setIsActive(false);
    if (timeout.current)
      clearTimeout(timeout.current);
    if (target.current)
      target.current.removeEventListener('touchend', preventDefault);
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
};