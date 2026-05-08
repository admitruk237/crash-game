'use client';

import { useGameStore } from '@/entities/game/model/store';
import { useBalance } from '@/entities/game/api/useBalance';
import { Button, Input, SectionTitle } from '@/shared/ui';
import { useGameControlsStore } from '../model/store';

export const BetAmountControl = () => {
  const { betAmount, setBetAmount, halfBet, doubleBet, maxBet } = useGameControlsStore();
  const { phase, myBet } = useGameStore();
  const { data: balanceData } = useBalance();

  const balance = balanceData?.balance ?? null;
  const isLocked = (phase === 'running' || phase === 'crashed') && Boolean(myBet);

  const parsedAmount = parseFloat(betAmount);
  const isTooHigh = balance !== null && parsedAmount > balance;
  const isTooLow = betAmount !== '' && parsedAmount <= 0;

  const handleMax = () => {
    if (balance !== null) {
      maxBet(balance);
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
          suffix="USD"
          disabled={isLocked}
          className={isTooHigh || isTooLow ? 'border-destructive' : ''}
        />
        {isTooLow && (
          <span className="absolute -bottom-4 left-0 text-[10px] text-destructive">
            Bet must be greater than 0
          </span>
        )}
        {isTooHigh && (
          <span className="absolute -bottom-4 left-0 text-[10px] text-destructive">
            Insufficient balance
          </span>
        )}
      </div>
      <div className="flex gap-2 justify-between mt-3">
        <Button
          variant="betAction"
          size="none"
          onClick={halfBet}
          disabled={isLocked}
          className="flex-1 h-[26px] rounded-[8px] border border-border/50 text-[12px] font-medium"
        >
          ½
        </Button>
        <Button
          variant="betAction"
          size="none"
          onClick={doubleBet}
          disabled={isLocked}
          className="flex-1 h-[26px] rounded-[8px] border border-border/50 text-[12px] font-medium"
        >
          ×2
        </Button>
        <Button
          variant="betAction"
          size="none"
          onClick={handleMax}
          disabled={isLocked}
          className="flex-1 h-[26px] rounded-[8px] border border-border/50 text-[12px] font-medium"
        >
          Max
        </Button>
      </div>
    </div>
  );
};
