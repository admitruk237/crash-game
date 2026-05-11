'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { useSessionStore } from '@/entities/session/model/store';
import { setApiConfig } from '@/shared/lib/apiClient';
import { setSocketConfig } from '@/shared/lib/socket';

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
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
