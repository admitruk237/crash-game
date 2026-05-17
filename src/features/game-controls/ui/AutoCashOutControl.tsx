'use client';

import { type ChangeEvent } from 'react';
import { Input, SectionTitle, Switch } from '@/shared/ui';
import { clampNumericString, sanitizeNumeric, soundManager } from '@/shared/lib';
import {
  DEFAULT_AUTO_CASH_OUT,
  MAX_AUTO_CASH_OUT,
  MIN_AUTO_CASH_OUT,
  SOUND_NAMES,
} from '@/shared/config';
import { useShallow } from 'zustand/react/shallow';
import { useGameControlsStore } from '../model/store';
import { type GameValidation } from '../model/useGameValidation';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  validation: GameValidation;
}

export const AutoCashOutControl = ({ validation }: Props) => {
  const {
    isAutoCashOutEnabled,
    setAutoCashOutEnabled,
    autoCashOutMultiplier,
    setAutoCashOutMultiplier,
  } = useGameControlsStore(
    useShallow((s) => ({
      isAutoCashOutEnabled: s.isAutoCashOutEnabled,
      setAutoCashOutEnabled: s.setAutoCashOutEnabled,
      autoCashOutMultiplier: s.autoCashOutMultiplier,
      setAutoCashOutMultiplier: s.setAutoCashOutMultiplier,
    }))
  );

  const { isLocked } = validation;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeNumeric(e.target.value);
    setAutoCashOutMultiplier(clampNumericString(sanitized, MAX_AUTO_CASH_OUT));
  };

  const handleBlur = () => {
    const num = parseFloat(autoCashOutMultiplier);
    if (!Number.isFinite(num) || num <= 0 || num < MIN_AUTO_CASH_OUT) {
      setAutoCashOutMultiplier(DEFAULT_AUTO_CASH_OUT);
    }
  };

  const handleToggle = (checked: boolean) => {
    soundManager.play(SOUND_NAMES.SWITCH);
    setAutoCashOutEnabled(checked);
  };

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center justify-between pb-4">
        <SectionTitle>Auto Cash Out</SectionTitle>
        <Switch checked={isAutoCashOutEnabled} onCheckedChange={handleToggle} disabled={isLocked} />
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
            <div className="pb-5">
              <Input
                type="text"
                inputMode="decimal"
                value={autoCashOutMultiplier}
                onChange={handleChange}
                onBlur={handleBlur}
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
