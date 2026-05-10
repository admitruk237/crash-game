import { Users, Wifi } from 'lucide-react';

interface PlayersInfoProps {
  playersCount: number;
  isMobile: boolean;
  onOpenPlayers: () => void;
}

export const PlayersInfo = ({ playersCount, isMobile, onOpenPlayers }: PlayersInfoProps) => (
  <>
    {isMobile ? (
      <div className="ml-4 flex items-center gap-1.5 cursor-pointer" onClick={onOpenPlayers}>
        <Users className="w-4 h-4 text-main" />
        <span className="font-sans text-[12px] text-main font-medium">{playersCount}</span>
      </div>
    ) : (
      <div className="ml-[20px] flex items-center gap-2">
        <Wifi className="w-4 h-4 text-main relative top-[-0.5px]" />
        <div className="flex items-center gap-1">
          <span>{playersCount}</span>
          <span>players</span>
        </div>
      </div>
    )}
  </>
);
