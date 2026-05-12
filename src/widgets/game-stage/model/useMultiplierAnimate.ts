'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useGameStore } from '@/entities/game';
import { soundManager, useCountdown } from '@/shared/lib';
import { BEEP_COUNTDOWN_MAX, BEEP_COUNTDOWN_MIN } from '@/shared/config';

const SMOOTHING_FACTOR = 0.3;
const ANIMATION_THRESHOLD = 0.001;
const MULTIPLIER_PRECISION = 100;

export const useMultiplierAnimate = () => {
  const phase = useGameStore((s) => s.phase);
  const serverMultiplier = useGameStore((s) => s.multiplier);
  const crashPoint = useGameStore((s) => s.crashPoint);
  const endsAt = useGameStore((s) => s.endsAt);
  const countdown = useCountdown(endsAt);

  const serverMultiplierRef = useRef(serverMultiplier);
  useLayoutEffect(() => {
    serverMultiplierRef.current = serverMultiplier;
  });

  const displayedRef = useRef(serverMultiplier);
  const [displayed, setDisplayed] = useState(serverMultiplier);

  const lastSoundPhase = useRef<string | null>(null);
  const lastSoundCountdown = useRef(countdown);

  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (phase === lastSoundPhase.current) return;
    lastSoundPhase.current = phase;

    if (phase === 'running') {
      soundManager.stop('beep');
      soundManager.stop('siren');
    } else if (phase === 'crashed') {
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

    if (countdown >= BEEP_COUNTDOWN_MIN && countdown <= BEEP_COUNTDOWN_MAX) {
      soundManager.play('beep');
    } else if (countdown === 1) {
      soundManager.play('siren');
    }
  }, [phase, countdown]);

  useEffect(() => {
    const setDisplayedMultiplier = useGameStore.getState().setDisplayedMultiplier;

    if (phase !== 'running') {
      displayedRef.current = serverMultiplierRef.current;
      setDisplayed(serverMultiplierRef.current);
      setDisplayedMultiplier(serverMultiplierRef.current);
      return;
    }

    const animate = () => {
      const diff = serverMultiplierRef.current - displayedRef.current;
      if (Math.abs(diff) > ANIMATION_THRESHOLD) {
        displayedRef.current += diff * SMOOTHING_FACTOR;
        const floored =
          Math.floor(displayedRef.current * MULTIPLIER_PRECISION) / MULTIPLIER_PRECISION;
        setDisplayed(floored);
        setDisplayedMultiplier(floored);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  return {
    phase,
    displayed,
    countdown,
    crashPoint,
  };
};
