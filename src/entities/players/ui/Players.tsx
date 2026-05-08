'use client';

import { Card, SectionTitle } from '@/shared/ui';
import { Users } from 'lucide-react';
import { PlayerItem } from './PlayerItem';
import { type PlayerStatus, PlayerStatuses } from '../model/types';
import { type PublicPlayer } from '@/shared/types/ws';

interface Props {
  players: PublicPlayer[];
}

export const Players = ({ players }: Props) => {
  return (
    <Card variant="game" className="w-[240px] p-[16px]">
      <SectionTitle icon={<Users className="w-4 h-4" />}>
        Live Players ({players.length})
      </SectionTitle>

      <div className="flex flex-col gap-2 mt-4">
        {players.map((player) => {
          let uiStatus: PlayerStatus = PlayerStatuses.WAITING;
          if (player.status === 'placed') uiStatus = PlayerStatuses.BET;
          else if (player.status === 'cashed_out') uiStatus = PlayerStatuses.WON;
          else if (player.status === 'lost') uiStatus = PlayerStatuses.LOST;

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
