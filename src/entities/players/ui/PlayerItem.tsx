'use client';

import { Card } from '@/shared/ui';
import { type PlayerStatus, PlayerStatuses } from '../model/types';
import { PLAYER_STATUS_COLORS } from '../model/constants';

interface Props {
  username: string;
  betAmount: number;
  status: PlayerStatus;
  winMultiplier?: number;
}

const GRADIENT_CLASSES = [
  'player-grad-0',
  'player-grad-1',
  'player-grad-2',
  'player-grad-3',
  'player-grad-4',
] as const;

export const PlayerItem = ({ username, betAmount, status, winMultiplier }: Props) => {
  const gradIndex = username.length % GRADIENT_CLASSES.length;
  const gradClass = GRADIENT_CLASSES[gradIndex];
  const displayName = username.length > 9 ? `${username.slice(0, 9)}...` : username;

  return (
    <Card variant="player" className="w-full flex items-center justify-between p-2">
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center shrink-0 w-8 h-8 rounded-full ${gradClass}`}
        >
          <span className="font-sans font-semibold text-xs text-text-bright">
            {username[0].toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-sans text-sm text-text-bright">{displayName}</span>
          <span className="font-sans text-xs text-main">
            {betAmount ? `${betAmount.toFixed(2)} USD` : '-'}
          </span>
        </div>
      </div>

      <div className={`font-mono text-xs ${PLAYER_STATUS_COLORS[status]}`}>
        {status === PlayerStatuses.WON
          ? `${winMultiplier?.toFixed(2)}x`
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </Card>
  );
};
