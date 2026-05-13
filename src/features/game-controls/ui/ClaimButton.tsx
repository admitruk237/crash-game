'use client';

import { useEffect, useRef } from 'react';
import { Button, LoaderIcon, type LoaderIconHandle } from '@/shared/ui';
import { GiftIcon } from 'lucide-react';
import { useClaimMutation } from '../api/useClaimMutation';

export const ClaimButton = () => {
  const { mutate, isPending, data } = useClaimMutation();
  const loaderRef = useRef<LoaderIconHandle>(null);
  const amount = data?.amount ?? 100;

  useEffect(() => {
    if (isPending) {
      loaderRef.current?.startAnimation();
    } else {
      loaderRef.current?.stopAnimation();
    }
  }, [isPending]);

  return (
    <Button variant="claim" size="none" disabled={isPending} onClick={() => mutate()}>
      {isPending ? (
        <LoaderIcon ref={loaderRef} size={14} isAnimated={false} className="mr-1" />
      ) : (
        <GiftIcon className="size-4 mr-1" />
      )}
      <span>{isPending ? 'Claiming...' : `Claim Bonus +${amount}`}</span>
    </Button>
  );
};
