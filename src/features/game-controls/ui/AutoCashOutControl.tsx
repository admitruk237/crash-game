'use client';

import { useGameStore } from '@/entities/game/model/store';
import { Input, Label, Switch } from '@/shared/ui';
import { useGameControlsStore } from '../model/store';
import { AnimatePresence, motion } from 'framer-motion';

export const AutoCashOutControl = () => {
  const {
    isAutoCashOutEnabled,
    setAutoCashOutEnabled,
    autoCashOutMultiplier,
    setAutoCashOutMultiplier,
  } = useGameControlsStore();

  const { phase, myBet } = useGameStore();
  const isLocked = phase === 'running' && Boolean(myBet);

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center justify-between pb-4">
        <Label className="text-main font-medium text-[12px] leading-[16px] tracking-[0.6px] uppercase">
          Auto Cash Out
        </Label>
        <Switch
          checked={isAutoCashOutEnabled}
          onCheckedChange={setAutoCashOutEnabled}
          disabled={isLocked}
        />
      </div>

      <AnimatePresence initial={false}>
        {isAutoCashOutEnabled && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: 'auto', opacity: 1, marginBottom: 0 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden w-full"
          >
            <div className="pb-1">
              <Input
                type="number"
                step="0.1"
                min="1.01"
                value={autoCashOutMultiplier}
                onChange={(e) => setAutoCashOutMultiplier(e.target.value)}
                suffix="x"
                disabled={isLocked}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
