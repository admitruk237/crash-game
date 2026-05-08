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
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex items-start gap-4 p-4 overflow-hidden">
        <ControlPanel balance={balanceData?.balance ?? null} />

        <div className="flex-1 min-w-0 flex flex-col gap-4 self-stretch">
          <HistoryList rounds={rounds} />
          <GameStage />
        </div>

        <Players players={players} />
      </main>

      <GameFooter />
    </div>
  );
};
