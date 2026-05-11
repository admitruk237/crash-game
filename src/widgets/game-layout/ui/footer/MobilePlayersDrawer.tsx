import { AnimatePresence, motion } from 'framer-motion';
import { Players } from '@/entities/players/ui/Players';
import { type PublicPlayer } from '@/shared/types/ws';

interface Props {
  isOpen: boolean;
  players: PublicPlayer[];
  onClose: () => void;
}

export const MobilePlayersDrawer = ({ isOpen, players, onClose }: Props) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 backdrop-blur-sm z-[100]"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 bottom-0 w-[280px] bg-background border-l border-border/50 z-[101] shadow-2xl flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto no-scrollbar">
            <Players players={players} onClose={onClose} isDrawer />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
