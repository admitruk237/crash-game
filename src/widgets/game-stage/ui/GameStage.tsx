'use client';

import { useGameStore } from '@/entities/game/model/store';
import { CrashCurve } from './CrashCurve';
import { MultiplierDisplay } from './MultiplierDisplay';
import { Badge } from '@/shared/ui/badge';

export const GameStage = () => {
  const phase = useGameStore((s) => s.phase);

  const phaseStyles = {
    running: {
      border: 'border-success/30',
      background: 'bg-stage-running',
      badgeVariant: 'status-running' as const,
      text: 'Running',
    },
    crashed: {
      border: 'border-destructive/30',
      background: 'bg-stage-crashed',
      badgeVariant: 'status-crashed' as const,
      text: 'Crashed',
    },
    waiting: {
      border: 'border-border/50',
      background: 'bg-stage-waiting',
      badgeVariant: 'status-waiting' as const,
      text: 'Waiting',
    },
  };

  const currentStyle = phaseStyles[phase as keyof typeof phaseStyles] || phaseStyles.waiting;

  return (
    <div
      className={`relative flex-1 min-h-[311px] bg-card rounded-[14px] border ${currentStyle.border} ${currentStyle.background} flex flex-col items-center justify-center overflow-hidden transition-all duration-500`}
    >
      <CrashCurve />

      <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
        <Badge variant={currentStyle.badgeVariant} size="md" className="uppercase font-bold">
          {currentStyle.text}
        </Badge>
      </div>

      <div className="relative z-10">
        <MultiplierDisplay />
      </div>
    </div>
  );
};
