'use client';

import { useGameSocket } from '@/entities/game/model/useGameSocket';
import { GameFooter } from './GameFooter';
import { ControlPanel } from './ControlPanel';
import { Players } from '@/entities/players/ui/Players';
import { HistoryList } from '@/entities/history/ui/HistoryList';
import { GameStage } from '@/widgets/game-stage/ui/GameStage';
import { useBalance } from '@/entities/game/api/useBalance';
import { useRecentRounds } from '@/entities/game/api/useRecentRounds';
import { useGameStore } from '@/entities/game/model/store';

export const GamePage = () => {
  useGameSocket();

  const { data: balanceData } = useBalance();
  const { data: recentData } = useRecentRounds(20);
  const players = useGameStore((s) => s.players);
  const rounds = recentData?.rounds ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <main className="flex-1 flex flex-col lg:flex-row items-start gap-4 p-4">
        <div className="w-full lg:flex-1 min-w-0 flex flex-col gap-4 self-stretch order-1 lg:order-2">
          <HistoryList rounds={rounds} />
          <GameStage />
        </div>
        <div className="w-full lg:w-auto flex flex-col md:flex-row lg:contents gap-4 order-2 lg:order-1">
          <div className="w-full md:flex-1 lg:w-[260px] lg:flex-none order-1">
            <ControlPanel balance={balanceData?.balance ?? null} />
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
