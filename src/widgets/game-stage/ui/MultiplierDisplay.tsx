'use client';

import { useMultiplierAnimate } from '../model/useMultiplierAnimate';

export const MultiplierDisplay = () => {
  const { phase, displayed, countdown, crashPoint } = useMultiplierAnimate();

  if (phase === 'waiting') {
    return (
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-[60px] font-normal leading-[60px] tracking-[-3px] text-[#FBBF24]"
          style={{ fontFamily: 'Menlo, monospace' }}
        >
          {countdown}s
        </span>
        <span className="text-[16px] font-normal leading-24px text-[#7A8599]">
          Next round starting...
        </span>
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
    <span className="text-[96px] font-normal leading-none text-success tabular-nums drop-shadow-[0_0_30px_rgba(34,197,94,0.4)]">
      {displayed.toFixed(2)}×
    </span>
  );
};
