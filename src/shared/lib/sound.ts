import { Howl } from 'howler';

import { SOUNDS, type SoundName } from '../config/sounds';

class SoundManager {
  private sounds: Map<string, Howl> = new Map();
  private enabled: boolean = true;

  constructor() {
    Object.entries(SOUNDS).forEach(([key, src]) => {
      this.sounds.set(
        key,
        new Howl({
          src: [src as string],
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

  play(name: SoundName) {
    if (!this.enabled) return;
    const sound = this.sounds.get(name);
    if (sound) {
      sound.play();
    }
  }

  stop(name: SoundName) {
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
