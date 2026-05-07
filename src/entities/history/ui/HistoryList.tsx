import { useRecentRounds } from '@/entities/game/api/useRecentRounds';
import { useRecentStore } from '@/entities/game/model/recentStore';
import { HistoryItem } from './HistoryItem';

export const HistoryList = () => {
  useRecentRounds(10);

  const rounds = useRecentStore((s) => s.rounds).slice(0, 10);

  return (
    <ul className="flex items-center flex-wrap gap-2 overflow-x-auto no-scrollbar">
      {rounds.map((round) => (
        <li key={round.roundId}>
          <HistoryItem crashPoint={round.crashPoint} tier={round.tier} />
        </li>
      ))}
      {rounds.length === 0 && (
        <div className="text-main opacity-50 text-xs py-1">No rounds yet...</div>
      )}
    </ul>
  );
};
