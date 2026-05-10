'use client';

import { useDragScroll } from '@/shared/lib/hooks/useDragScroll';
import { HistoryItem } from './HistoryItem';
import { type RecentRound } from '@/shared/types/api';

interface Props {
  rounds: RecentRound[];
}

export const HistoryList = ({ rounds }: Props) => {
  const { scrollRef, ...dragEvents } = useDragScroll();

  return (
    <ul
      ref={scrollRef}
      {...dragEvents}
      className="flex items-center gap-2 overflow-x-auto no-scrollbar  select-none pb-2 active:cursor-grabbing"
    >
      {rounds.map((round) => (
        <li key={round.roundId}>
          <HistoryItem crashPoint={round.crashPoint} tier={round.tier} />
        </li>
      ))}
      {rounds.length === 0 && (
        <div className="text-main opacity-50 text-xs py-1">No players yet...</div>
      )}
    </ul>
  );
};
