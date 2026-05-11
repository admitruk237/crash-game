'use client';

import { useMainButtonView } from '@/entities/game/model/selectors';
import { Button } from '@/shared/ui';
import { cn } from '@/shared/lib/utils';
import { soundManager } from '@/shared/lib/sound';
import { useGameActions } from '../model/useGameActions';
import { type GameValidation } from '../model/useGameValidation';

interface Props {
  validation: GameValidation;
}

export const MainGameButton = ({ validation }: Props) => {
  const { phase, multiplier, myBet, crashPoint } = useMainButtonView();
  const { placeBet, cashOut, isActionLoading } = useGameActions();

  const isButtonDisabled = isActionLoading || Boolean(myBet) || !validation.canPlaceBet;

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
      disabled={isButtonDisabled}
      className={cn(
        'border-none transition-all',
        isButtonDisabled
          ? 'bg-border text-white opacity-100 cursor-not-allowed'
          : 'bg-accent text-black hover:bg-accent/90 shadow-accent-glow'
      )}
    >
      {Boolean(myBet) ? 'Bet placed' : 'Place bet'}
    </Button>
  );
};
