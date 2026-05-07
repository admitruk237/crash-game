'use client';

import { Card } from '@/shared/ui';
import { type PlayerStatus, PlayerStatuses } from '../model/types';
import { PLAYER_GRADIENTS, PLAYER_STATUS_COLORS } from '../model/constants';

interface PlayerItemProps {
  username: string;
  betAmount?: number;
  status: PlayerStatus;
  winMultiplier?: number;
}

export const PlayerItem = ({ username, betAmount, status, winMultiplier }: PlayerItemProps) => {
  const gradient = PLAYER_GRADIENTS[username.length % PLAYER_GRADIENTS.length];

  return (
    <Card variant="player" className="w-full flex items-center justify-between p-2">
      <div className="flex items-center gap-3">
        <div
          className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full"
          style={{ background: gradient }}
        >
          <span className="font-sans font-semibold text-[12px] text-text-bright">
            {username[0].toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="font-sans text-[14px] leading-[20px] text-text-bright">{username}</span>
          <span className="font-sans text-[12px] leading-[16px] text-main">
            {betAmount ? `${betAmount.toFixed(2)} USD` : '-'}
          </span>
        </div>
      </div>

      <div className={`font-mono text-[12px] leading-[16px] ${PLAYER_STATUS_COLORS[status]}`}>
        {status === PlayerStatuses.WON
          ? `${winMultiplier?.toFixed(2)}x`
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </Card>
  );
};
