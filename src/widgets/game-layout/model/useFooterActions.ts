'use client';

import { useState } from 'react';
import { useSessionStore } from '@/entities/session';
import { disconnectSocket, soundManager } from '@/shared/lib';

interface FooterActions {
  isMuted: boolean;
  handleLogout: () => void;
  handleToggleMute: () => void;
}

export const useFooterActions = (): FooterActions => {
  const clear = useSessionStore((s) => s.clear);
  const [isMuted, setIsMuted] = useState(false);

  const handleLogout = () => {
    soundManager.stopAll();
    soundManager.toggle(true);
    disconnectSocket();
    clear();
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.toggle(!nextMuted);
    if (nextMuted) {
      soundManager.stopAll();
    }
  };

  return {
    isMuted,
    handleLogout,
    handleToggleMute,
  };
};
