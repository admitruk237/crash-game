'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useDragScroll } from '@/shared/lib';
import { HistoryItem } from './HistoryItem';
import { type RecentRound } from '@/shared/types';

interface Props {
  rounds: RecentRound[];
  isLoading?: boolean;
}

export const HistoryList = ({ rounds, isLoading }: Props) => {
  const { scrollRef, ...dragEvents } = useDragScroll();

  return (
    <ul
      ref={scrollRef}
      {...dragEvents}
      className="flex items-center gap-2 overflow-x-auto no-scrollbar select-none pb-2 active:cursor-grabbing"
    >
      {isLoading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <li key={`skeleton-${i}`} className="shrink-0">
            <div className="w-[54px] h-[24px] rounded-full bg-muted animate-pulse" />
          </li>
        ))
      ) : (
        <AnimatePresence initial={false}>
          {rounds.map((round) => (
            <motion.li
              key={round.roundId}
              layout
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 1,
              }}
              className="shrink-0"
            >
              <HistoryItem crashPoint={round.crashPoint} tier={round.tier} />
            </motion.li>
          ))}
          {!isLoading && rounds.length === 0 && (
            <div className="text-main opacity-50 text-xs py-1">No rounds yet...</div>
          )}
        </AnimatePresence>
      )}
    </ul>
  );
};
