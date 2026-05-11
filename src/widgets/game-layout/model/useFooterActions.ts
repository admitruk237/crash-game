import { useState } from 'react';
import { useGameStore } from '@/entities/game/model/store';
import { useSessionStore } from '@/entities/session/model/store';
import { disconnectSocket } from '@/shared/lib/socket';
import { soundManager } from '@/shared/lib/sound';

interface FooterActions {
  isMuted: boolean;
  handleLogout: () => void;
  handleToggleMute: () => void;
}

export const useFooterActions = (): FooterActions => {
  const phase = useGameStore((s) => s.phase);
  const { clear } = useSessionStore();
  const [isMuted, setIsMuted] = useState(false);

  const handleLogout = () => {
    soundManager.stopAll();
    disconnectSocket();
    clear();
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.toggle(!nextMuted);
    if (nextMuted) {
      soundManager.stopAll();
    } else {
      soundManager.resumeForPhase(phase);
    }
  };

  return {
    isMuted,
    handleLogout,
    handleToggleMute,
  };
};
