export const PlayerStatuses = {
  BET: 'bet',
  WAITING: 'waiting',
  LOST: 'lost',
  WON: 'won',
} as const;

export type PlayerStatus = (typeof PlayerStatuses)[keyof typeof PlayerStatuses];
