'use client';

import { useGameStore } from '@/entities/game/model/store';
import { Input, SectionTitle, Switch } from '@/shared/ui';
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
  const parsedMultiplier = parseFloat(autoCashOutMultiplier);
  const isTooLowMult = autoCashOutMultiplier !== '' && parsedMultiplier < 1.1;
  const isTooHighMult = parsedMultiplier > 10000;
  const isLocked = phase === 'running' && Boolean(myBet);

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center justify-between pb-4">
        <SectionTitle>Auto Cash Out</SectionTitle>
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
            <div className="pb-5 relative">
              <Input
                type="number"
                step="0.1"
                value={autoCashOutMultiplier}
                onChange={(e) => setAutoCashOutMultiplier(e.target.value)}
                suffix="x"
                disabled={isLocked}
                className={isTooLowMult || isTooHighMult ? 'border-destructive' : ''}
              />
              {isTooLowMult && (
                <span className="absolute bottom-0.5 left-0 text-[10px] text-destructive">
                  Min multiplier 1.10x
                </span>
              )}
              {isTooHighMult && (
                <span className="absolute bottom-0.5 left-0 text-[10px] text-destructive">
                  Max multiplier 10000x
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
