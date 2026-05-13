'use client';

import { cn } from '@/shared/lib/utils';
import {
  domMin,
  LazyMotion,
  m,
  useAnimation,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { forwardRef, type HTMLAttributes, useCallback, useImperativeHandle, useRef } from 'react';

export interface LoaderIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Props extends Omit<
  HTMLAttributes<HTMLDivElement>,
  | 'color'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
> {
  size?: number;
  duration?: number;
  isAnimated?: boolean;
  color?: string;
}

const LoaderIcon = forwardRef<LoaderIconHandle, Props>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 24,
      duration = 1,
      isAnimated = true,
      color,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const reduced = useReducedMotion();
    const isControlled = useRef(false);

    useImperativeHandle(ref, () => {
      isControlled.current = true;
      return {
        startAnimation: () => (reduced ? controls.start('normal') : controls.start('animate')),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleEnter = useCallback(
      (e?: React.MouseEvent<HTMLDivElement>) => {
        if (!isAnimated || reduced) return;
        if (!isControlled.current) controls.start('animate');
        else onMouseEnter?.(e as React.MouseEvent<HTMLDivElement>);
      },
      [controls, reduced, isAnimated, onMouseEnter]
    );

    const handleLeave = useCallback(
      (e?: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlled.current) controls.start('normal');
        else onMouseLeave?.(e as React.MouseEvent<HTMLDivElement>);
      },
      [controls, onMouseLeave]
    );

    const wrapperVariants: Variants = {
      normal: { rotate: 0, scale: 1, transition: { duration: 0.3 * duration } },
      animate: {
        rotate: 360,
        scale: [1, 1.1, 1],
        transition: {
          rotate: { duration: Number(duration), ease: 'linear', repeat: Infinity },
          scale: { duration: 0.6 * duration, repeat: Infinity, repeatType: 'mirror' },
        },
      },
    };

    return (
      <LazyMotion features={domMin} strict>
        <m.div
          className={cn('inline-flex items-center justify-center', className)}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          {...props}
          style={{ color, ...props.style }}
        >
          <m.svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={wrapperVariants}
            animate={controls}
            initial="normal"
          >
            <m.path d="M12 2v4" />
            <m.path d="m16.2 7.8 2.9-2.9" />
            <m.path d="M18 12h4" />
            <m.path d="m16.2 16.2 2.9 2.9" />
            <m.path d="M12 18v4" />
            <m.path d="m4.9 19.1 2.9-2.9" />
            <m.path d="M2 12h4" />
            <m.path d="m4.9 4.9 2.9 2.9" />
          </m.svg>
        </m.div>
      </LazyMotion>
    );
  }
);

LoaderIcon.displayName = 'LoaderIcon';
export { LoaderIcon };
