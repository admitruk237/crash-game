import { PlayerStatuses } from './types';

export const PLAYER_STATUS_COLORS = {
  [PlayerStatuses.BET]: 'text-accent',
  [PlayerStatuses.WAITING]: 'text-badge-waiting-text',
  [PlayerStatuses.LOST]: 'text-destructive',
  [PlayerStatuses.WON]: 'text-success',
} as const;
