'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/entities/session';
import { useGameStore } from '@/entities/game';
import { disconnectSocket } from '@/shared/lib';
import { useNavigationStore } from './navigation-state';
import { useQueryClient } from '@tanstack/react-query';

interface AuthFormState {
  username: string;
  isReady: boolean;
  setUsername: (value: string) => void;
  handleEnter: () => void;
}

export const useAuthForm = (): AuthFormState => {
  const [username, setUsername] = useState<string>('');
  const isReady = username.length >= 3;
  const router = useRouter();
  const queryClient = useQueryClient();
  const setKey = useSessionStore((s) => s.setKey);
  const markJustLoggedIn = useNavigationStore((s) => s.markJustLoggedIn);

  const handleEnter = () => {
    if (!isReady) return;

    queryClient.clear();

    useGameStore.getState().reset();

    disconnectSocket();

    setKey(username.trim(), true);

    markJustLoggedIn();

    router.replace('/');
  };

  return {
    username,
    isReady,
    setUsername,
    handleEnter,
  };
};
