import { Button } from '@/shared/ui';
import { GiftIcon } from 'lucide-react';
import { useClaimMutation } from '../api/useClaimMutation';

export const ClaimButton = () => {
  const { mutate, isPending, data } = useClaimMutation();
  const amount = data?.amount ?? 100;

  return (
    <Button variant="claim" size="none" disabled={isPending} onClick={() => mutate()}>
      <GiftIcon className="size-4 mr-1" />
      <span>{isPending ? 'Claiming...' : `Claim Bonus +${amount}`}</span>
    </Button>
  );
};
