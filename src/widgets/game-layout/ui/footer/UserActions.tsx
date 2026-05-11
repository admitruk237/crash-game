import { LogOut, User, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/shared/ui/button';

interface Props {
  apiKey: string | null;
  isMuted: boolean;
  onLogout: () => void;
  onToggleMute: () => void;
}

export const UserActions = ({ apiKey, isMuted, onLogout, onToggleMute }: Props) => (
  <div className="flex items-center md:gap-4 gap-1">
    <Button
      variant="secondaryGame"
      size="xs"
      onClick={onLogout}
      className="px-[12px] gap-[8px] border border-border/50"
    >
      <User className="w-3 h-3 text-main group-hover/button:text-white transition-colors" />
      <span className="leading-none text-[12px]">{apiKey}</span>
      <LogOut className="w-3 h-3 text-main group-hover/button:text-white transition-colors" />
    </Button>

    <Button
      variant="ghost"
      size="icon-sm"
      onClick={onToggleMute}
      className="text-main hover:text-text-bright transition-colors"
    >
      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </Button>
  </div>
);
