'use client';

import { useGameSocket } from '@/entities/game/model/useGameSocket';
import { GameFooter } from './GameFooter';
import { ControlPanel } from './ControlPanel';
import { Players } from '@/entities/players/ui/Players';
import { HistoryList } from '@/entities/history/ui/HistoryList';

export const GamePage = () => {
  useGameSocket();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex items-start gap-4 p-4 overflow-hidden">
        <ControlPanel />

        <div className="flex-1 min-w-0 flex flex-col gap-4 self-stretch">
          <HistoryList />
          <div className="flex-1 min-h-[311px] bg-card rounded-[14px] border border-border/50 flex flex-col items-center justify-center relative overflow-hidden">
            <h1 className="text-4xl font-bold tracking-tight text-white">Game Area</h1>
            <p className="mt-4 text-zinc-400">Chart visualization goes here.</p>
          </div>
        </div>

        <Players />
      </main>

      <GameFooter />
    </div>
  );
};
