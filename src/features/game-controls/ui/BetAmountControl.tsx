'use client';

import { type ChangeEvent } from 'react';
import { Button, Input, SectionTitle } from '@/shared/ui';
import { clampNumericString, sanitizeNumeric, soundManager } from '@/shared/lib';
import { DEFAULT_BET_AMOUNT, MAX_BET_AMOUNT, MIN_BET_AMOUNT, SOUND_NAMES } from '@/shared/config';
import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore } from '../model/store';
import { type GameValidation } from '../model/useGameValidation';

const BET_QUICK_ACTIONS = [
  { label: '½', key: 'half' },
  { label: '×2', key: 'double' },
  { label: 'Max', key: 'max' },
] as const;

type BetActionKey = (typeof BET_QUICK_ACTIONS)[number]['key'];

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
  const { isLocked, balance } = validation;

  const effectiveMax = Math.min(balance ?? MAX_BET_AMOUNT, MAX_BET_AMOUNT);
  const isMaxDisabled = isLocked || balance === undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeNumeric(e.target.value);
    setBetAmount(clampNumericString(sanitized, effectiveMax));
  };

  const handleMax = () => {
    if (balance === undefined) return;
    maxBet(Math.min(balance, MAX_BET_AMOUNT));
  };

  const handleBlur = () => {
    const num = parseFloat(betAmount);
    if (!Number.isFinite(num) || num <= 0 || num < MIN_BET_AMOUNT) {
      setBetAmount(DEFAULT_BET_AMOUNT);
    }
  };

  const actionHandlers: Record<BetActionKey, { onClick: () => void; disabled: boolean }> = {
    half: { onClick: halfBet, disabled: isLocked },
    double: { onClick: doubleBet, disabled: isLocked },
    max: { onClick: handleMax, disabled: isMaxDisabled },
  };

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle>Bet Amount</SectionTitle>
      <Input
        type="text"
        inputMode="decimal"
        value={betAmount}
        onChange={handleChange}
        onBlur={handleBlur}
        suffix="USD"
        disabled={isLocked}
      />
      <div className="flex gap-2 justify-between mt-3">
        {BET_QUICK_ACTIONS.map(({ label, key }) => {
          const { onClick, disabled } = actionHandlers[key];
          return (
            <Button
              key={key}
              variant="betAction"
              size="none"
              onClick={() => {
                soundManager.play(SOUND_NAMES.CLICK);
                onClick();
              }}
              disabled={disabled}
              className="flex-1"
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
