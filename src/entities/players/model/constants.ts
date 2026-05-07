import { PlayerStatuses } from './types';

export const PLAYER_GRADIENTS = [
  'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
  'linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)',
  'linear-gradient(135deg, #84FAB0 0%, #8FD3F4 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
] as const;

export const PLAYER_STATUS_COLORS = {
  [PlayerStatuses.BET]: 'text-accent',
  [PlayerStatuses.WAITING]: 'text-badge-waiting-text',
  [PlayerStatuses.LOST]: 'text-destructive',
  [PlayerStatuses.WON]: 'text-success',
} as const;
