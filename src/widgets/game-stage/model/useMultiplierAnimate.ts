import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/entities/game/model/store';
import { useCountdown } from '@/shared/lib/hooks/useCountdown';
import { soundManager } from '@/shared/lib/sound';

export const useMultiplierAnimate = () => {
  const phase = useGameStore((s) => s.phase);
  const serverMultiplier = useGameStore((s) => s.multiplier);
  const crashPoint = useGameStore((s) => s.crashPoint);
  const endsAt = useGameStore((s) => s.endsAt);
  const countdown = useCountdown(endsAt);

  const displayedRef = useRef(serverMultiplier);
  const [displayed, setDisplayed] = useState(serverMultiplier);

  const [prevPhase, setPrevPhase] = useState(phase);
  const [prevCountdown, setPrevCountdown] = useState(countdown);

  const lastSoundPhase = useRef<string | null>(null);
  const lastSoundCountdown = useRef(countdown);

  const rafRef = useRef<number>(0);

  if (phase !== prevPhase) {
    setPrevPhase(phase);
    if (phase !== 'running') {
      setDisplayed(serverMultiplier);
    }
  }

  if (countdown !== prevCountdown) {
    setPrevCountdown(countdown);
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
