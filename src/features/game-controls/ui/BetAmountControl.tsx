'use client';

import { Button, Input, SectionTitle } from '@/shared/ui';
import { useGameControlsStore } from '../model/store';
import { type GameValidation } from '../model/useGameValidation';
import { DEFAULT_BET_AMOUNT, MAX_BET_AMOUNT } from '@/shared/config/game';

interface Props {
  validation: GameValidation;
}

export const BetAmountControl = ({ validation }: Props) => {
  const { betAmount, setBetAmount, halfBet, doubleBet, maxBet } = useGameControlsStore();
  const { bet, isLocked, balance } = validation;

  const handleMax = () => {
    if (balance !== undefined) {
      maxBet(Math.min(balance, MAX_BET_AMOUNT));
    }
  };

  const handleBlur = () => {
    if (bet.isEmpty) {
      setBetAmount(DEFAULT_BET_AMOUNT);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle>Bet Amount</SectionTitle>
      <div className="relative">
        <Input
          type="number"
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          onBlur={handleBlur}
          suffix="USD"
          disabled={isLocked}
          className={
            bet.tooHigh || bet.tooLow || bet.exceedsMax || bet.isEmpty ? 'border-destructive' : ''
          }
        />
        {bet.isEmpty && (
          <span className="absolute -bottom-4 left-0 text-[10px] text-destructive">
            Field cannot be empty
          </span>
        )}
        {bet.tooLow && !bet.isEmpty && (
          <span className="absolute -bottom-4 left-0 text-[10px] text-destructive">
            Min bet is 0.1 USD
          </span>
        )}
        {bet.exceedsMax && !bet.isEmpty && (
          <span className="absolute -bottom-4 left-0 text-[10px] text-destructive">
            Max bet is {MAX_BET_AMOUNT} USD
          </span>
        )}
        {bet.tooHigh && !bet.exceedsMax && !bet.isEmpty && (
          <span className="absolute -bottom-4 left-0 text-[10px] text-destructive">
            Insufficient balance
          </span>
        )}
      </div>
      <div className="flex gap-2 justify-between mt-3">
        {[
          { label: '½', onClick: halfBet },
          { label: '×2', onClick: doubleBet },
          { label: 'Max', onClick: handleMax },
        ].map((action) => (
          <Button
            key={action.label}
            variant="betAction"
            size="none"
            onClick={action.onClick}
            disabled={isLocked}
            className="flex-1"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
