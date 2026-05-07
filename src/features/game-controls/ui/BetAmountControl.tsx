'use client';

import { useGameStore } from '@/entities/game/model/store';
import { Button, Input, SectionTitle } from '@/shared/ui';
import { useGameControlsStore } from '../model/store';

export const BetAmountControl = () => {
  const { betAmount, setBetAmount, halfBet, doubleBet, maxBet } = useGameControlsStore();
  const { balance, phase, myBet } = useGameStore();

  const isLocked = phase === 'running' && Boolean(myBet);

  const handleMax = () => {
    if (balance !== null) {
      maxBet(balance);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle>Bet Amount</SectionTitle>
      <Input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
        suffix="USD"
        disabled={isLocked}
      />
      <div className="flex gap-2 justify-between">
        <Button variant="betAction" size="none" onClick={halfBet} disabled={isLocked}>
          ½
        </Button>
        <Button variant="betAction" size="none" onClick={doubleBet} disabled={isLocked}>
          ×2
        </Button>
        <Button variant="betAction" size="none" onClick={handleMax} disabled={isLocked}>
          Max
        </Button>
      </div>
    </div>
  );
};
