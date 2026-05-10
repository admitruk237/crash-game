'use client';

import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import type { HTMLAttributes } from 'react';
import { motion, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';

export interface TruckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const TRUCK_VARIANTS: Variants = {
  normal: { x: 0, y: 0 },
  animate: {
    y: [0, -1, 0, -0.5, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

const WHEEL_VARIANTS: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: 360,
    transition: { duration: 0.5, ease: 'linear', repeat: Infinity },
  },
};

const SPEED_LINE_VARIANTS: Variants = {
  normal: { opacity: 0, x: 0, scaleX: 0 },
  animate: (custom: number) => ({
    opacity: [0, 0.7, 0.5, 0],
    x: [0, -4, -10, -16],
    scaleX: [0.2, 1, 0.8, 0.3],
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      repeat: Infinity,
      delay: custom * 0.08,
      times: [0, 0.2, 0.6, 1],
    },
  }),
};

const SPEED_LINES = [
  { y: 8, width: 5, x: 0 },
  { y: 11, width: 7, x: -1 },
  { y: 14, width: 4, x: 0 },
];

export const TruckIcon = forwardRef<TruckIconHandle, Props>(
  ({ className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(() => {
      if (!isControlledRef.current) controls.start('animate');
    }, [controls]);

    const handleMouseLeave = useCallback(() => {
      if (!isControlledRef.current) controls.start('normal');
    }, [controls]);

    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          className="overflow-visible"
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
        >
          {SPEED_LINES.map((line, i) => (
            <motion.line
              animate={controls}
              custom={i}
              initial="normal"
              key={`speed-${i}`}
              strokeLinecap="round"
              strokeWidth="2"
              variants={SPEED_LINE_VARIANTS}
              x1={line.x}
              x2={line.x + line.width}
              y1={line.y}
              y2={line.y}
            />
          ))}

          <motion.g animate={controls} initial="normal" variants={TRUCK_VARIANTS}>
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          </motion.g>

          <motion.g animate={controls} initial="normal" variants={TRUCK_VARIANTS}>
            <motion.g
              animate={controls}
              initial="normal"
              style={{ transformOrigin: '7px 18px' }}
              variants={WHEEL_VARIANTS}
            >
              <circle cx="7" cy="18" r="2" />
              <line strokeWidth="1.5" x1="7" x2="7" y1="16.5" y2="19.5" />
              <line strokeWidth="1.5" x1="5.5" x2="8.5" y1="18" y2="18" />
            </motion.g>
          </motion.g>

          <motion.g animate={controls} initial="normal" variants={TRUCK_VARIANTS}>
            <motion.g
              animate={controls}
              initial="normal"
              style={{ transformOrigin: '17px 18px' }}
              variants={WHEEL_VARIANTS}
            >
              <circle cx="17" cy="18" r="2" />
              <line strokeWidth="1.5" x1="17" x2="17" y1="16.5" y2="19.5" />
              <line strokeWidth="1.5" x1="15.5" x2="18.5" y1="18" y2="18" />
            </motion.g>
          </motion.g>
        </svg>
      </div>
    );
  }
);

TruckIcon.displayName = 'TruckIcon';
