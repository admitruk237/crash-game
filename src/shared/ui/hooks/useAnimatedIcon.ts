import { useAnimation } from 'framer-motion';
import { useCallback, useRef } from 'react';

export const useAnimatedIcon = () => {
  const controls = useAnimation();
  const isControlled = useRef(false);

  const startAnimation = useCallback(() => controls.start('animate'), [controls]);
  const stopAnimation = useCallback(() => controls.start('normal'), [controls]);

  const handleEnter = useCallback(() => {
    if (!isControlled.current) controls.start('animate');
  }, [controls]);

  const handleLeave = useCallback(() => {
    if (!isControlled.current) controls.start('normal');
  }, [controls]);

  return { controls, isControlled, startAnimation, stopAnimation, handleEnter, handleLeave };
};
