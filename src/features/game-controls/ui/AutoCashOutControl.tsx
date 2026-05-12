'use client';

import { Input, SectionTitle, Switch } from '@/shared/ui';
import { useGameControlsStore } from '../model/store';
import { type GameValidation } from '../model/useGameValidation';
import { AnimatePresence, motion } from 'framer-motion';
import { DEFAULT_AUTO_CASH_OUT, MAX_AUTO_CASH_OUT, MIN_AUTO_CASH_OUT } from '@/shared/config';

interface Props {
  validation: GameValidation;
}

export const AutoCashOutControl = ({ validation }: Props) => {
  const {
    isAutoCashOutEnabled,
    setAutoCashOutEnabled,
    autoCashOutMultiplier,
    setAutoCashOutMultiplier,
  } = useGameControlsStore();

  const { autoCashOut, isLocked } = validation;

  const handleBlur = () => {
    if (autoCashOut.isEmpty) {
      setAutoCashOutMultiplier(DEFAULT_AUTO_CASH_OUT);
    }
  };

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
                onBlur={handleBlur}
                suffix="x"
                disabled={isLocked}
                className={
                  autoCashOut.tooLow || autoCashOut.tooHigh || autoCashOut.isEmpty
                    ? 'border-destructive'
                    : ''
                }
              />
              {autoCashOut.isEmpty && (
                <span className="absolute bottom-0.5 left-0 text-[10px] text-destructive">
                  Field cannot be empty
                </span>
              )}
              {autoCashOut.tooLow && !autoCashOut.isEmpty && (
                <span className="absolute bottom-0.5 left-0 text-[10px] text-destructive">
                  Min multiplier {MIN_AUTO_CASH_OUT.toFixed(2)}x
                </span>
              )}
              {autoCashOut.tooHigh && !autoCashOut.isEmpty && (
                <span className="absolute bottom-0.5 left-0 text-[10px] text-destructive">
                  Max multiplier {MAX_AUTO_CASH_OUT}x
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
