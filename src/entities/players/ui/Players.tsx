import { useGameStore } from '@/entities/game/model/store';
import { Card, SectionTitle } from '@/shared/ui';
import { Users } from 'lucide-react';
import { PlayerItem } from './PlayerItem';
import { BetStatuses } from '@/shared/types/common';
import { type PlayerStatus, PlayerStatuses } from '../model/types';

export const Players = () => {
  const { players } = useGameStore();

  return (
    <Card variant="game" className="w-[240px] p-[16px]">
      <SectionTitle icon={<Users className="w-4 h-4" />}>
        Live Players ({players.length})
      </SectionTitle>

      <div className="flex flex-col gap-2 mt-4">
        {players.map((player) => {
          let uiStatus: PlayerStatus = PlayerStatuses.WAITING;
          if (player.status === BetStatuses.PLACED) uiStatus = PlayerStatuses.BET;
          else if (player.status === BetStatuses.CASHED_OUT) uiStatus = PlayerStatuses.WON;
          else if (player.status === BetStatuses.LOST) uiStatus = PlayerStatuses.LOST;

          return (
            <PlayerItem
              key={player.username}
              username={player.username}
              betAmount={player.amount}
              status={uiStatus}
              winMultiplier={player.multiplier ?? undefined}
            />
          );
        })}
        {players.length === 0 && (
          <div className="py-8 text-center font-sans text-[12px] text-main opacity-50">
            Waiting for players...
          </div>
        )}
      </div>
    </Card>
  );
};
