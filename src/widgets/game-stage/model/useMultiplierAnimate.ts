import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/entities/game/model/store';
import { useCountdown } from '@/shared/lib/hooks/useCountdown';

export const useMultiplierAnimate = () => {
  const phase = useGameStore((s) => s.phase);
  const serverMultiplier = useGameStore((s) => s.multiplier);
  const crashPoint = useGameStore((s) => s.crashPoint);
  const endsAt = useGameStore((s) => s.endsAt);
  const countdown = useCountdown(endsAt);

  const displayedRef = useRef(serverMultiplier);
  const [displayed, setDisplayed] = useState(serverMultiplier);
  const [prevPhase, setPrevPhase] = useState(phase);
  const rafRef = useRef<number>(0);

  if (phase !== prevPhase) {
    setPrevPhase(phase);
    if (phase !== 'running') {
      setDisplayed(serverMultiplier);
    }
  }

  useEffect(() => {
    if (phase !== 'running') {
      displayedRef.current = serverMultiplier;
      return;
    }

    displayedRef.current = displayed;

    const animate = () => {
      const diff = serverMultiplier - displayedRef.current;
      if (Math.abs(diff) > 0.001) {
        displayedRef.current += diff * 0.3;
        const floored = Math.floor(displayedRef.current * 100) / 100;
        setDisplayed(floored);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, serverMultiplier, displayed]);

  return {
    phase,
    displayed,
    countdown,
    crashPoint,
  };
};
