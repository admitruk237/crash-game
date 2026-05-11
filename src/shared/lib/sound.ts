import { Howl } from 'howler';

const SOUNDS = {
  beep: '/sounds/beep.mp3',
  siren: '/sounds/siren.mp3',
  diesel: '/sounds/diesel.mp3',
  crash: '/sounds/crash.mp3',
  click: '/sounds/click.mp3',
  bet: '/sounds/bet.mp3',
  cashout: '/sounds/cashout.mp3',
  switch: '/sounds/switch.mp3',
};

class SoundManager {
  private sounds: Map<string, Howl> = new Map();
  private enabled: boolean = true;

  constructor() {
    Object.entries(SOUNDS).forEach(([key, src]) => {
      this.sounds.set(
        key,
        new Howl({
          src: [src],
          volume: 0.5,
          loop: key === 'diesel',
          onloaderror: (_id, error) =>
            console.error(`[SoundManager] Failed to load "${key}":`, error),
          onplayerror: (_id, error) =>
            console.error(`[SoundManager] Failed to play "${key}":`, error),
        })
      );
    });
  }

  play(name: keyof typeof SOUNDS) {
    if (!this.enabled) return;
    const sound = this.sounds.get(name);
    if (sound) {
      sound.play();
    }
  }

  stop(name: keyof typeof SOUNDS) {
    const sound = this.sounds.get(name);
    if (sound) {
      sound.stop();
    }
  }

  stopAll() {
    this.sounds.forEach((sound) => sound.stop());
  }

  resumeForPhase(phase: string) {
    if (!this.enabled) return;
    if (phase === 'running') {
      this.play('diesel');
    }
  }

  toggle(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const soundManager = new SoundManager();
