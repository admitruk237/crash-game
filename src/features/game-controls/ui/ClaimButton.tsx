'use client';

import { Button, LoaderIcon } from '@/shared/ui';
import { GiftIcon } from 'lucide-react';
import { useClaimMutation } from '../api/useClaimMutation';
import { soundManager } from '@/shared/lib';
import { SOUND_NAMES } from '@/shared/config';

export const ClaimButton = () => {
  const { mutate, isPending, data } = useClaimMutation();
  const amount = data?.amount ?? 100;

  const handleClaim = () => {
    soundManager.play(SOUND_NAMES.CLICK);
    mutate();
  };

  return (
    <Button variant="claim" size="none" disabled={isPending} onClick={handleClaim}>
      {isPending ? (
        <LoaderIcon size={14} isAnimated className="mr-1" />
      ) : (
        <GiftIcon className="size-4 mr-1" />
      )}
      <span>{isPending ? 'Claiming...' : `Claim Bonus +${amount}`}</span>
    </Button>
  );
};
