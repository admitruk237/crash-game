'use client';

import { LogOut, User, Volume2, VolumeX, Wifi } from 'lucide-react';
import { useState } from 'react';
import { useGameStore } from '@/entities/game/model/store';
import { useSessionStore } from '@/entities/session/model/store';
import { disconnectSocket } from '@/shared/lib/socket';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

export const GameFooter = () => {
  const { connectionStatus, roundId, players } = useGameStore();
  const { apiKey, clear } = useSessionStore();
  const [isMuted, setIsMuted] = useState(false);

  const isConnected = connectionStatus === 'connected';

  const handleLogout = () => {
    disconnectSocket();
    clear();
  };

  return (
    <footer className="w-full h-10 flex items-center justify-between px-4 bg-background border-t border-border/50">
      {/* Left Block */}
      <div className="flex items-center font-sans font-normal text-main text-[12px] leading-[16px]">
        <div className="flex items-center">
          <span
            className={cn(
              'w-2 h-2 rounded-full transition-colors duration-300 relative top-[-0.5px]',
              isConnected ? 'bg-success' : 'bg-destructive'
            )}
          />
          <span className="ml-[8px]">{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>

        <span className="mx-2 flex items-center justify-center">•</span>

        <div className="flex items-center">
          <span>Round #{roundId?.replace('round_', '') || '—'}</span>
        </div>

        <div className="ml-[20px] flex items-center gap-2">
          <Wifi className="w-4 h-4 text-main relative top-[-0.5px]" />
          <div className="flex items-center gap-1">
            <span>{players.length}</span>
            <span>players</span>
          </div>
        </div>
      </div>

      {/* Right Block */}
      <div className="flex items-center gap-4">
        <Button
          variant="secondaryGame"
          size="xs"
          onClick={handleLogout}
          className="px-[12px] gap-[8px] border border-border/50"
        >
          <User className="w-3 h-3 text-main group-hover/button:text-white transition-colors" />
          <span className="leading-none text-[12px]">{apiKey}</span>
          <LogOut className="w-3 h-3 text-main group-hover/button:text-white transition-colors" />
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setIsMuted(!isMuted)}
          className="text-main hover:text-text-bright transition-colors"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </div>
    </footer>
  );
};
