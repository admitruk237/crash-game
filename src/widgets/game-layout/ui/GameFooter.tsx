'use client';

import { useState } from 'react';
import { useGameStore } from '@/entities/game/model/store';
import { useSessionStore } from '@/entities/session/model/store';
import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery';
import { useFooterActions } from '../model/useFooterActions';
import { StatusInfo } from './footer/StatusInfo';
import { PlayersInfo } from './footer/PlayersInfo';
import { UserActions } from './footer/UserActions';
import { MobilePlayersDrawer } from './footer/MobilePlayersDrawer';

export const GameFooter = () => {
  const { connectionStatus, roundId, players } = useGameStore();
  const { apiKey } = useSessionStore();
  const { isMobile } = useMediaQuery();
  const [isPlayersOpen, setIsPlayersOpen] = useState(false);
  const { isMuted, handleLogout, handleToggleMute } = useFooterActions();

  return (
    <footer className="w-full h-10 flex items-center justify-between px-4 bg-background border-t border-border/50">
      <div className="flex items-center font-sans font-normal text-main text-[12px] leading-[16px]">
        <StatusInfo
          isConnected={connectionStatus === 'connected'}
          roundId={roundId}
          isMobile={isMobile}
        />
        <PlayersInfo
          playersCount={players.length}
          isMobile={isMobile}
          onOpenPlayers={() => setIsPlayersOpen(true)}
        />
      </div>

      <UserActions
        apiKey={apiKey}
        isMuted={isMuted}
        onLogout={handleLogout}
        onToggleMute={handleToggleMute}
      />

      <MobilePlayersDrawer
        isOpen={isPlayersOpen}
        players={players}
        onClose={() => setIsPlayersOpen(false)}
      />
    </footer>
  );
};
