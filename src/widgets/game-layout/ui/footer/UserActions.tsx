'use client';

import { useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import {
  Button,
  LogoutIcon,
  type LogoutIconHandle,
  VolumeIcon,
  type VolumeIconHandle,
} from '@/shared/ui';

interface Props {
  apiKey: string | null;
  isMuted: boolean;
  onLogout: () => void;
  onToggleMute: () => void;
}

export const UserActions = ({ apiKey, isMuted, onLogout, onToggleMute }: Props) => {
  const logoutIconRef = useRef<LogoutIconHandle>(null);
  const volumeIconRef = useRef<VolumeIconHandle>(null);

  useEffect(() => {
    if (isMuted) {
      volumeIconRef.current?.stopAnimation();
    } else {
      volumeIconRef.current?.startAnimation();
    }
  }, [isMuted]);

  return (
    <div className="flex items-center md:gap-4 gap-1">
      <Button
        variant="secondaryGame"
        size="xs"
        onClick={onLogout}
        className="px-[12px] gap-[8px] border border-border/50"
        onMouseEnter={() => logoutIconRef.current?.startAnimation()}
        onMouseLeave={() => logoutIconRef.current?.stopAnimation()}
      >
        <User className="w-3 h-3 text-main group-hover/button:text-white transition-colors" />
        <span className="leading-none text-[12px]">{apiKey}</span>
        <LogoutIcon
          ref={logoutIconRef}
          size={12}
          isAnimated={false}
          className="text-main group-hover/button:text-white transition-colors"
        />
      </Button>

      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onToggleMute}
        className="text-main hover:text-text-bright transition-colors"
      >
        <VolumeIcon ref={volumeIconRef} size={20} initialActive={!isMuted} />
      </Button>
    </div>
  );
};
