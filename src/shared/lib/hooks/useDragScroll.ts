import { useCallback, useRef } from 'react';
import type { MouseEvent } from 'react';

export const useDragScroll = () => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = useCallback((e: MouseEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  }, []);

  const onMouseLeave = useCallback(() => {
    isDown.current = false;
  }, []);

  const onMouseUp = useCallback(() => {
    isDown.current = false;
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  return {
    scrollRef,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
  };
};
