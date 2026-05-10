import { cn } from '@/shared/lib/utils';

interface StatusInfoProps {
  isConnected: boolean;
  roundId: string | null;
  isMobile: boolean;
}

export const StatusInfo = ({ isConnected, roundId, isMobile }: StatusInfoProps) => (
  <div className="flex items-center">
    <div className="flex items-center">
      <span
        className={cn(
          'w-2 h-2 rounded-full transition-colors duration-300 relative top-[-0.5px]',
          isConnected ? 'bg-success' : 'bg-destructive'
        )}
      />
      {!isMobile && <span className="ml-[8px]">{isConnected ? 'Connected' : 'Disconnected'}</span>}
    </div>

    {!isMobile && <span className="ml-2 flex items-center justify-center">•</span>}

    <div className="flex items-center ml-2">
      <span>
        {isMobile ? 'R#' : 'Round #'}
        {roundId?.replace('round_', '') || '—'}
      </span>
    </div>
  </div>
);
