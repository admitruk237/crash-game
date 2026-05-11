import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/entities/game/model/store';
import { useCountdown } from '@/shared/lib/hooks/useCountdown';
import { soundManager } from '@/shared/lib/sound';

const SMOOTHING_FACTOR = 0.3;
const ANIMATION_THRESHOLD = 0.001;
const MULTIPLIER_PRECISION = 100;

export const useMultiplierAnimate = () => {
  const phase = useGameStore((s) => s.phase);
  const serverMultiplier = useGameStore((s) => s.multiplier);
  const crashPoint = useGameStore((s) => s.crashPoint);
  const endsAt = useGameStore((s) => s.endsAt);
  const countdown = useCountdown(endsAt);

  const displayedRef = useRef(serverMultiplier);
  const [displayed, setDisplayed] = useState(serverMultiplier);

  const lastSoundPhase = useRef<string | null>(null);
  const lastSoundCountdown = useRef(countdown);

  const rafRef = useRef<number>(0);
  const prevPhaseRef = useRef(phase);

  if (phase !== prevPhaseRef.current) {
    prevPhaseRef.current = phase;
    if (phase !== 'running') {
      setDisplayed(serverMultiplier);
    }
  }

  useEffect(() => {
    if (phase === lastSoundPhase.current) return;
    lastSoundPhase.current = phase;

    if (phase === 'running') {
      soundManager.stop('beep');
      soundManager.stop('siren');
      soundManager.play('diesel');
    } else if (phase === 'crashed') {
      soundManager.stop('diesel');
      soundManager.play('crash');
    } else if (phase === 'waiting') {
      soundManager.stopAll();
      lastSoundCountdown.current = -1;
    }
  }, [phase]);
  useEffect(() => {
    if (phase !== 'waiting') return;
    if (countdown === lastSoundCountdown.current) return;

    if (lastSoundCountdown.current === -1) {
      lastSoundCountdown.current = countdown;
      return;
    }

    lastSoundCountdown.current = countdown;

    if (countdown >= 2 && countdown <= 10) {
      soundManager.play('beep');
    } else if (countdown === 1) {
      soundManager.play('siren');
    }
  }, [phase, countdown]);

  useEffect(() => {
    if (phase !== 'running') {
      displayedRef.current = serverMultiplier;
      return;
    }

    displayedRef.current = displayed;

    const animate = () => {
      const diff = serverMultiplier - displayedRef.current;
      if (Math.abs(diff) > ANIMATION_THRESHOLD) {
        displayedRef.current += diff * SMOOTHING_FACTOR;
        const floored =
          Math.floor(displayedRef.current * MULTIPLIER_PRECISION) / MULTIPLIER_PRECISION;
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
