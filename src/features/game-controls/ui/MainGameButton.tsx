'use client';

import { useMainButtonView } from '@/entities/game';
import { Button } from '@/shared/ui';
import { cn, soundManager } from '@/shared/lib';
import { SOUND_NAMES } from '@/shared/config';
import { useGameActions } from '../model/useGameActions';
import { type GameValidation } from '../model/useGameValidation';
import { CashOutButton } from './CashOutButton';

interface Props {
  validation: GameValidation;
}

export const MainGameButton = ({ validation }: Props) => {
  const { phase, myBet, crashPoint } = useMainButtonView();
  const { cashOut, isActionLoading } = useGameActions();

  const isButtonDisabled = isActionLoading || Boolean(myBet) || !validation.canPlaceBet;

  const handleCashOut = () => {
    soundManager.play(SOUND_NAMES.CLICK);
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
      return (
        <CashOutButton
          betAmount={myBet.amount}
          isActionLoading={isActionLoading}
          onCashOut={handleCashOut}
        />
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
      type="submit"
      variant="action"
      onClick={() => soundManager.play(SOUND_NAMES.BET)}
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
