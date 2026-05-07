'use client';

import { useGameStore } from '@/entities/game/model/store';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import { useGameActions } from '../model/useGameActions';
import { Phases } from '@/shared/types/common';

export const MainGameButton = () => {
  const { phase, multiplier, myBet, crashPoint } = useGameStore();
  const { placeBet, cashOut, isActionLoading } = useGameActions();

  if (phase === Phases.CRASHED) {
    return (
      <Button
        variant="action"
        disabled
        className="bg-[#F04438] text-white! border-none opacity-100! cursor-not-allowed"
      >
        Crashed @ {crashPoint?.toFixed(2)}x
      </Button>
    );
  }

  if (phase === Phases.RUNNING) {
    if (myBet) {
      const currentWin = (myBet.amount * multiplier).toFixed(2);
      return (
        <Button
          variant="action"
          onClick={cashOut}
          disabled={isActionLoading}
          className="bg-success text-black border-none hover:bg-success/90"
        >
          Cash Out — {currentWin} USD
        </Button>
      );
    }

    return (
      <Button
        variant="action"
        disabled
        className="bg-[#1A1F2E] text-white! border-none opacity-100! cursor-not-allowed"
      >
        Wait for next round
      </Button>
    );
  }

  return (
    <Button
      variant="action"
      onClick={placeBet}
      disabled={isActionLoading || Boolean(myBet)}
      className={cn(
        'border-none transition-all',
        Boolean(myBet)
          ? 'bg-[#1A1F2E] text-white! opacity-100! cursor-not-allowed'
          : 'bg-[#FBBF24] text-black! hover:bg-[#FBBF24]/90 shadow-[0_0_20px_rgba(251,191,36,0.2)]'
      )}
    >
      {Boolean(myBet) ? 'Bet placed' : 'Place bet'}
    </Button>
  );
};
