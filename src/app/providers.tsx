'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { useSessionStore } from '@/entities/session';
import { setApiConfig, setSocketConfig } from '@/shared/lib';

if (typeof window !== 'undefined') {
  setApiConfig({
    getToken: () => useSessionStore.getState().apiKey,
    onUnauthorized: () => useSessionStore.getState().clear(),
  });
  setSocketConfig(() => useSessionStore.getState().apiKey);
}

interface Props {
  children: ReactNode;
}

export const Providers = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            networkMode: 'always',
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
