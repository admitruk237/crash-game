'use client';

import { useGameSocket } from '@/entities/game';
import { GameFooter } from './GameFooter';
import { ControlPanel } from './ControlPanel';
import { Players } from '@/entities/players';
import { HistoryList } from '@/entities/history';
import { useGameActions } from '@/features/game-controls';
import { SoundModal } from '@/features/sound-prompt';
import { useGamePageData } from '../model/useGamePageData';
import { type ReactNode } from 'react';

interface Props {
  stage: ReactNode;
}

export const GamePage = ({ stage }: Props) => {
  const { soundHandlers } = useGameActions();
  useGameSocket(soundHandlers);

  const { rounds, players, isHistoryLoading } = useGamePageData();

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <SoundModal />
      <main className="flex-1 flex flex-col lg:flex-row items-start gap-4 p-4">
        <div className="w-full lg:flex-1 min-w-0 flex flex-col gap-4 self-stretch order-1 lg:order-2">
          <HistoryList rounds={rounds} isLoading={isHistoryLoading} />
          {stage}
        </div>
        <div className="w-full lg:w-auto flex flex-col md:flex-row lg:contents gap-4 order-2 lg:order-1">
          <div className="w-full md:flex-1 lg:w-[260px] lg:flex-none order-1">
            <ControlPanel />
          </div>
          <div className="w-full md:flex-1 lg:w-[280px] lg:flex-none order-2 lg:order-3 hidden md:block">
            <Players players={players} />
          </div>
        </div>
      </main>

      <GameFooter />
    </div>
  );
};
