export const WS_EVENTS = {
  ROUND_STATE: 'round:state',
  ROUND_WAITING: 'round:waiting',
  ROUND_START: 'round:start',
  ROUND_TICK: 'round:tick',
  ROUND_CRASH: 'round:crash',
  BET_PLACED: 'bet:placed',
  BET_CASHED_OUT: 'bet:cashedOut',
  BET_LOST: 'bet:lost',
  BET_REJECTED: 'bet:rejected',
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
} as const;
