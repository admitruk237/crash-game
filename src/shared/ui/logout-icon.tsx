'use client';

import { cn } from '@/shared/lib/utils';
import { domMin, LazyMotion, m, useReducedMotion, type Variants } from 'framer-motion';
import { forwardRef, type HTMLAttributes, useImperativeHandle } from 'react';
import { useAnimatedIcon } from './hooks/useAnimatedIcon';

export interface LogoutIconHandle {
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

const LogoutIcon = forwardRef<LogoutIconHandle, Props>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 28,
      duration = 1,
      isAnimated = true,
      color,
      ...props
    },
    ref
  ) => {
    const { controls, isControlled, startAnimation, stopAnimation, handleEnter, handleLeave } =
      useAnimatedIcon();
    const reduced = useReducedMotion();

    useImperativeHandle(ref, () => {
      isControlled.current = true;
      return {
        startAnimation: () => (reduced ? stopAnimation() : startAnimation()),
        stopAnimation,
      };
    });

    const iconVariants: Variants = {
      normal: { scale: 1, rotate: 0 },
      animate: {
        scale: [1, 1.1, 0.95, 1],
        rotate: [0, 3, -2, 0],
        transition: { duration: 0.9 * duration, ease: 'easeInOut' },
      },
    };

    const arrowVariants: Variants = {
      normal: { x: 0, opacity: 1 },
      animate: {
        x: [8, -2, 0],
        opacity: [0, 1, 1],
        transition: { duration: 0.6 * duration, ease: 'easeOut' },
      },
    };

    const doorVariants: Variants = {
      normal: { pathLength: 1 },
      animate: {
        pathLength: [0, 1],
        transition: { duration: 0.7 * duration, ease: 'easeInOut', delay: 0.1 },
      },
    };

    return (
      <LazyMotion features={domMin} strict>
        <m.div
          className={cn('inline-flex items-center justify-center', className)}
          onMouseEnter={(e) => {
            if (!isAnimated || reduced) return;
            handleEnter();
            onMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            handleLeave();
            onMouseLeave?.(e);
          }}
          {...props}
          style={
            color ? ({ '--icon-color': color, ...props.style } as React.CSSProperties) : props.style
          }
        >
          <m.svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--icon-color, currentColor)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={controls}
            initial="normal"
            variants={iconVariants}
          >
            <m.path d="m16 17 5-5-5-5" variants={arrowVariants} />
            <m.path d="M21 12H9" variants={arrowVariants} />
            <m.path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" variants={doorVariants} />
          </m.svg>
        </m.div>
      </LazyMotion>
    );
  }
);

LogoutIcon.displayName = 'LogoutIcon';
export { LogoutIcon };
