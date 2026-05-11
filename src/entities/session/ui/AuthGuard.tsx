'use client';

import { type ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '../model/store';

interface Props {
  children: ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const { apiKey, _hasHydrated } = useSessionStore();

  useEffect(() => {
    if (_hasHydrated && !apiKey) {
      router.replace('/login');
    }
  }, [_hasHydrated, apiKey, router]);

  if (!_hasHydrated || !apiKey) {
    return null;
  }

  return <>{children}</>;
};
