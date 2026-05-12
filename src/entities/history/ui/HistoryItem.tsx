'use client';

import { Badge } from '@/shared/ui';
import type { RoundTier } from '@/shared/types';

interface Props {
  crashPoint: number;
  tier: RoundTier;
}

export const HistoryItem = ({ crashPoint, tier }: Props) => {
  return (
    <Badge variant={tier} className="cursor-default">
      {crashPoint.toFixed(2)}x
    </Badge>
  );
};
