'use client';

import { useGameStore } from '@/entities/game/model/store';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import { soundManager } from '@/shared/lib/sound';
import { useGameActions } from '../model/useGameActions';

export const MainGameButton = () => {
  const { phase, multiplier, myBet, crashPoint } = useGameStore();
  const { placeBet, cashOut, isActionLoading } = useGameActions();

  const handlePlaceBet = () => {
    soundManager.play('bet');
    placeBet();
  };

  const handleCashOut = () => {
    cashOut();
  };

  if (phase === 'crashed') {
    return (
      <Button
        variant="action"
        disabled
        className="bg-destructive text-white border-none opacity-100 cursor-not-allowed"
      >
        Crashed @ {crashPoint?.toFixed(2)}x
      </Button>
    );
  }

  if (phase === 'running') {
    if (myBet) {
      const currentWin = (myBet.amount * multiplier).toFixed(2);
      return (
        <Button
          variant="action"
          onClick={handleCashOut}
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
        className="bg-border text-white border-none opacity-100 cursor-not-allowed"
      >
        Wait for next round
      </Button>
    );
  }

  return (
    <Button
      variant="action"
      onClick={handlePlaceBet}
      disabled={isActionLoading || Boolean(myBet)}
      className={cn(
        'border-none transition-all',
        Boolean(myBet)
          ? 'bg-border text-white opacity-100 cursor-not-allowed'
          : 'bg-accent text-black hover:bg-accent/90 shadow-[0_0_20px_rgba(251,191,36,0.2)]'
      )}
    >
      {Boolean(myBet) ? 'Bet placed' : 'Place bet'}
    </Button>
  );
};
