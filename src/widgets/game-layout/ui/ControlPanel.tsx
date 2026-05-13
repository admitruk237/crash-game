'use client';

import Image from 'next/image';
import {
  AutoCashOutControl,
  BetAmountControl,
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
      className="lg:w-[260px] w-full p-[16px] min-h-[311px] flex flex-col shrink-0 transition-all duration-300 ease-in-out"
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[16px]">
        <BetAmountControl validation={validation} />
        <AutoCashOutControl validation={validation} />
        <div className="pt-4 border-t border-border/50">
          <MainGameButton validation={validation} />
        </div>
      </form>
      <div className="flex-1" />
      <div className="p-[16px] border-t border-border/50">
        <div className="flex items-center justify-between pt-[4px]">
          <div className="flex items-center gap-[8px]">
            <Image src={CoinIcon} alt="balance" width={16} height={16} />
            <span className="font-sans font-normal text-[12px] leading-[16px] text-main">
              Balance
            </span>
          </div>
          {isLoading ? (
            <div className="w-[80px] h-[24px] bg-muted rounded animate-pulse" />
          ) : (
            <span className="font-mono font-normal text-[16px] leading-[24px] text-clr-accent">
              {balance !== null ? balance.toFixed(2) : '0.00'}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
