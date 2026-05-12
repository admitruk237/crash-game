'use client';

import { useEffect, useRef } from 'react';
import { useCrashCurve } from '../model/useCrashCurve';
import { type DrawColors, drawCurve } from '../lib/drawCurve';
import { TruckIcon, type TruckIconHandle } from './TruckIcon';

export const CrashCurve = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const truckWrapRef = useRef<HTMLDivElement>(null);
  const truckIconRef = useRef<TruckIconHandle>(null);
  const rafRef = useRef<number>(0);
  const { pointsRef, phaseRef } = useCrashCurve();

  const colorsRef = useRef<DrawColors>({ success: '', error: '' });

  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement);
    colorsRef.current.success = rootStyle.getPropertyValue('--clr-success').trim();
    colorsRef.current.error = rootStyle.getPropertyValue('--clr-error').trim();
  }, []);

  useEffect(() => {
    truckIconRef.current?.startAnimation();
  }, []);

  useEffect(() => {
    const loop = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
          canvas.width = canvas.clientWidth;
          canvas.height = canvas.clientHeight;
        }

        const ctx = canvas.getContext('2d');
        if (ctx) {
          const last = drawCurve(
            ctx,
            canvas.width,
            canvas.height,
            pointsRef.current,
            phaseRef.current,
            colorsRef.current
          );
          const truck = truckWrapRef.current;

          if (truck) {
            const isRunning = phaseRef.current === 'running';
            truck.style.display = isRunning && last ? 'block' : 'none';
            if (last) {
              truck.style.left = `${last.x}px`;
              truck.style.top = `${last.y}px`;
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pointsRef, phaseRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Crash curve graph"
        className="absolute inset-0 w-full h-full"
      />
      <div
        ref={truckWrapRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden"
      >
        <TruckIcon ref={truckIconRef} size={24} className="text-success" />
      </div>
    </>
  );
};
