'use client';

import { Button, Input, SectionTitle } from '@/shared/ui';
import { soundManager } from '@/shared/lib';
import { DEFAULT_BET_AMOUNT, MAX_BET_AMOUNT, MIN_BET_AMOUNT, SOUND_NAMES } from '@/shared/config';
import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore } from '../model/store';
import { type GameValidation } from '../model/useGameValidation';

interface Props {
  validation: GameValidation;
}

export const BetAmountControl = ({ validation }: Props) => {
  const { betAmount, setBetAmount, halfBet, doubleBet, maxBet } = useGameControlsStore(
    useShallow((s) => ({
      betAmount: s.betAmount,
      setBetAmount: s.setBetAmount,
      halfBet: s.halfBet,
      doubleBet: s.doubleBet,
      maxBet: s.maxBet,
    }))
  );
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
          <span className="absolute -bottom-4 left-0 text-2xs text-destructive">
            Field cannot be empty
          </span>
        )}
        {bet.tooLow && !bet.isEmpty && (
          <span className="absolute -bottom-4 left-0 text-2xs text-destructive">
            Min bet is {MIN_BET_AMOUNT} USD
          </span>
        )}
        {bet.exceedsMax && !bet.isEmpty && (
          <span className="absolute -bottom-4 left-0 text-2xs text-destructive">
            Max bet is {MAX_BET_AMOUNT} USD
          </span>
        )}
        {bet.tooHigh && !bet.exceedsMax && !bet.isEmpty && (
          <span className="absolute -bottom-4 left-0 text-2xs text-destructive">
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
            onClick={() => {
              soundManager.play(SOUND_NAMES.CLICK);
              action.onClick();
            }}
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
