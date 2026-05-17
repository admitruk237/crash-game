'use client';

import { memo } from 'react';
import { useGameStore } from '@/entities/game';
import { CrashCurve } from './CrashCurve';
import { MultiplierDisplay } from './MultiplierDisplay';
import { Badge } from '@/shared/ui';

import { type Phase } from '@/shared/types';

const PHASE_STYLES: Record<
  Phase,
  { badge: 'status-running' | 'status-crashed' | 'status-waiting'; text: string; bg: string }
> = {
  running: { badge: 'status-running', text: 'Running', bg: 'bg-stage-running' },
  crashed: { badge: 'status-crashed', text: 'Crashed', bg: 'bg-stage-crashed' },
  waiting: { badge: 'status-waiting', text: 'Waiting', bg: 'bg-stage-waiting' },
};

const GameStageComponent = () => {
  const phase = useGameStore((s) => s.phase);
  const style = PHASE_STYLES[phase] ?? PHASE_STYLES.waiting;

  return (
    <div
      className={`relative flex-1 min-h-[311px] rounded-[14px] border border-border/50 flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${style.bg}`}
    >
      <CrashCurve />
      <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
        <Badge variant={style.badge} size="md" className="uppercase font-bold">
          {style.text}
        </Badge>
      </div>
      <div className="relative z-10">
        <MultiplierDisplay />
      </div>
    </div>
  );
};

export const GameStage = memo(GameStageComponent);
