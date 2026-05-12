'use client';

import { type ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { useSessionStore } from '@/entities/session';

interface Props {
  children: ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter();
  const { apiKey, _hasHydrated } = useSessionStore(
    useShallow((s) => ({ apiKey: s.apiKey, _hasHydrated: s._hasHydrated }))
  );

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
