export const SOUNDS = {
  beep: '/sounds/beep.mp3',
  siren: '/sounds/siren.mp3',
  diesel: '/sounds/diesel.mp3',
  crash: '/sounds/crash.mp3',
  click: '/sounds/click.mp3',
  bet: '/sounds/bet.mp3',
  cashout: '/sounds/cashout.mp3',
  switch: '/sounds/switch.mp3',
  coef: '/sounds/coef.mp3',
} as const;

export type SoundName = keyof typeof SOUNDS;
