'use client';

import { type RefObject, useState } from 'react';

import { useSessionStore } from '@/entities/session';
import { disconnectSocket, soundManager } from '@/shared/lib';
import type { VolumeIconHandle } from '@/shared/ui';

interface FooterActions {
  isMuted: boolean;
  handleLogout: () => void;
  handleToggleMute: (ref: RefObject<VolumeIconHandle | null>) => void;
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

  const handleToggleMute = (ref: RefObject<VolumeIconHandle | null>) => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundManager.toggle(!nextMuted);
    if (nextMuted) {
      soundManager.stopAll();
    }
    ref.current?.[nextMuted ? 'stopAnimation' : 'startAnimation']();
  };

  return {
    isMuted,
    handleLogout,
    handleToggleMute,
  };
};
