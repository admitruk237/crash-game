import type { BetStatus } from '@/shared/types';
import { type PlayerStatus, PlayerStatuses } from './types';

const STATUS_MAP: Record<BetStatus, PlayerStatus> = {
  placed: PlayerStatuses.BET,
  cashed_out: PlayerStatuses.WON,
  lost: PlayerStatuses.LOST,
};

export const mapBetStatusToPlayerStatus = (status: BetStatus): PlayerStatus => {
  return STATUS_MAP[status] ?? PlayerStatuses.WAITING;
};
