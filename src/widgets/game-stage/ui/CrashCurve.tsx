'use client';

import { useEffect, useRef } from 'react';
import { useCrashCurve } from '../model/useCrashCurve';
import { drawCurve } from '../lib/drawCurve';

export const CrashCurve = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const { pointsRef, phaseRef } = useCrashCurve();

  useEffect(() => {
    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }

      drawCurve(ctx, canvas.width, canvas.height, pointsRef.current, phaseRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pointsRef, phaseRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};
