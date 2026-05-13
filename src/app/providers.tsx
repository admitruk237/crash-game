'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { toast } from 'sonner';
import { ApiError, setApiConfig, setSocketConfig } from '@/shared/lib';
import { useSessionStore } from '@/entities/session';

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
          mutations: {
            onError: (error: Error) => {
              if (error instanceof ApiError && error.status === 429) return;
              toast.error(error.message);
            },
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
