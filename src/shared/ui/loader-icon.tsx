'use client';

import { cn } from '@/shared/lib/utils';
import { domMin, LazyMotion, m, useReducedMotion, type Variants } from 'framer-motion';
import { forwardRef, type HTMLAttributes, useImperativeHandle } from 'react';
import { useAnimatedIcon } from './hooks/useAnimatedIcon';

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
