'use client';

import Image from 'next/image';
import {
  AutoCashOutControl,
  BetAmountControl,
  ClaimButton,
  MainGameButton,
  useGameActions,
  useGameValidation,
} from '@/features/game-controls';
import { useBalance } from '@/entities/game';
import CoinIcon from '@/shared/assets/icons/coin.svg';
import { Card } from '@/shared/ui';

export const ControlPanel = () => {
  const validation = useGameValidation();
  const { isLoading } = useBalance();
  const { placeBet } = useGameActions();
  const balance = validation.balance ?? null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeBet();
  };

  return (
    <Card
      variant="game"
      className="lg:w-65 w-full p-4 min-h-77.75 flex flex-col shrink-0 transition-all duration-300 ease-in-out"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <BetAmountControl validation={validation} />
        <AutoCashOutControl validation={validation} />
        <div className="pb-6 border-b border-border/50 flex flex-col gap-4">
          <MainGameButton validation={validation} />
          <ClaimButton />
        </div>
      </form>
      <div className="flex-1" />
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <Image src={CoinIcon} alt="balance" width={16} height={16} />
            <span className="font-sans font-normal text-[12px] leading-4 text-main">Balance</span>
          </div>
          {isLoading ? (
            <div className="w-20 h-6 bg-muted rounded animate-pulse" />
          ) : (
            <span className="font-mono font-normal text-[16px] leading-6 text-clr-accent">
              {balance !== null ? balance.toFixed(2) : '0.00'}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
