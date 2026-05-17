'use client';

import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/entities/game';
import { Button } from '@/shared/ui';

interface Props {
  betAmount: number;
  isActionLoading: boolean;
  onCashOut: () => void;
}

export const CashOutButton = ({ betAmount, isActionLoading, onCashOut }: Props) => {
  const [currentWin, setCurrentWin] = useState('0.00');
  const rafRef = useRef(0);

  useEffect(() => {
    const loop = () => {
      const m = useGameStore.getState().displayedMultiplier;
      setCurrentWin((betAmount * m).toFixed(2));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [betAmount]);

  return (
    <Button
      type="button"
      variant="action"
      onClick={onCashOut}
      disabled={isActionLoading}
      className="bg-success text-black border-none hover:bg-success/90"
    >
      Cash Out — {currentWin} USD
    </Button>
  );
};
