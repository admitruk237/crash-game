import { useEffect, useRef } from 'react';
import { getSocket } from '@/shared/lib';
import { useGameStore } from '@/entities/game';
import type { Phase, RoundStateEvent, RoundTickEvent } from '@/shared/types';
import { generateHistoryPoints } from '../lib/generatePoints';

interface Point {
  x: number;
  y: number;
}

export const useCrashCurve = () => {
  const pointsRef = useRef<Point[]>([]);
  const phaseRef = useRef<Phase>(useGameStore.getState().phase);

  useEffect(() => {
    return useGameStore.subscribe((s) => {
      phaseRef.current = s.phase;
    });
  }, []);

  useEffect(() => {
    const s = getSocket();

    const onTick = (e: RoundTickEvent) => {
      if (e.roundId !== useGameStore.getState().roundId) return;
      if (pointsRef.current.length === 0) {
        pointsRef.current.push({ x: 0, y: 1 });
      }
      pointsRef.current.push({ x: e.elapsedMs, y: e.multiplier });
    };

    const onState = (data: RoundStateEvent) => {
      if (data.phase === 'running' && data.elapsedMs && data.elapsedMs > 0) {
        pointsRef.current = generateHistoryPoints(data.elapsedMs, data.currentMultiplier);
      } else {
        pointsRef.current = [];
      }
    };

    const onReset = () => {
      pointsRef.current = [];
    };

    s.on('round:tick', onTick);
    s.on('round:state', onState);
    s.on('round:waiting', onReset);

    return () => {
      s.off('round:tick', onTick);
      s.off('round:state', onState);
      s.off('round:waiting', onReset);
    };
  }, []);

  return {
    pointsRef,
    phaseRef,
  };
};
