import { Badge } from '@/shared/ui/badge';
import type { RoundTier } from '@/shared/types/common';

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
