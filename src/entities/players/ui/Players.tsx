'use client';

import { Button, Card, SectionTitle } from '@/shared/ui';
import { Users, X } from 'lucide-react';
import { PlayerItem } from './PlayerItem';
import { type PlayerStatus, PlayerStatuses } from '../model/types';
import { type PublicPlayer } from '@/shared/types/ws';

import { cn } from '@/shared/lib/utils';

interface Props {
  players: PublicPlayer[];
  onClose?: () => void;
  isDrawer?: boolean;
}

export const Players = ({ players, onClose, isDrawer }: Props) => {
  return (
    <Card
      variant="game"
      className={cn(
        'lg:w-[240px] w-full h-full p-[16px]',
        isDrawer && 'rounded-none border-none  shadow-none'
      )}
    >
      <div className="flex items-center justify-between">
        <SectionTitle icon={<Users className="w-4 h-4" />}>
          Live Players ({players.length})
        </SectionTitle>
        {onClose && (
          <Button
            variant="ghost"
            size="none"
            onClick={onClose}
            className="text-main opacity-60 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

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
