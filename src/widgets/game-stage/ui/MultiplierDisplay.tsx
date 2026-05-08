'use client';

import { useMultiplierAnimate } from '../model/useMultiplierAnimate';

export const MultiplierDisplay = () => {
  const { phase, displayed, countdown, crashPoint } = useMultiplierAnimate();

  if (phase === 'waiting') {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="text-6xl font-normal tracking-[-3px] text-accent font-menlo">
          {countdown}s
        </span>
        <span className="text-base font-normal text-zinc-400">Next round starting...</span>
      </div>
    );
  }

  if (phase === 'crashed') {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="text-[96px] font-normal leading-none text-destructive tabular-nums">
          {(crashPoint ?? 0).toFixed(2)}×
        </span>
        <span className="text-2xl text-destructive uppercase tracking-widest">Crashed</span>
      </div>
    );
  }

  return (
    <span className="text-[96px] font-normal leading-none text-success tabular-nums multiplier-glow">
      {displayed.toFixed(2)}×
    </span>
  );
};
