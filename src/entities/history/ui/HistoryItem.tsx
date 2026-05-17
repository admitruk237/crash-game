'use client';

import { memo } from 'react';
import { Badge } from '@/shared/ui';
import type { RoundTier } from '@/shared/types';

interface Props {
  crashPoint: number;
  tier: RoundTier;
}

const HistoryItemComponent = ({ crashPoint, tier }: Props) => {
  return (
    <Badge variant={tier} className="cursor-default">
      {crashPoint.toFixed(2)}x
    </Badge>
  );
};

export const HistoryItem = memo(HistoryItemComponent);
