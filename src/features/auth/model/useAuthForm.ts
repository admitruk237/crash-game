'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/entities/session';
import { useGameStore } from '@/entities/game';
import { disconnectSocket } from '@/shared/lib';
import { useNavigationStore } from './navigation-state';
import { useQueryClient } from '@tanstack/react-query';

const CYRILLIC_REGEX = /[а-яёА-ЯЁіІїЇєЄґҐ]/u;

interface AuthFormState {
  username: string;
  rememberMe: boolean;
  isReady: boolean;
  hasCyrillicError: boolean;
  setUsername: (value: string) => void;
  setRememberMe: (value: boolean) => void;
  handleEnter: () => void;
}

export const useAuthForm = (): AuthFormState => {
  const [username, setUsername] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const hasCyrillicError = CYRILLIC_REGEX.test(username);
  const isReady = username.length >= 3 && !hasCyrillicError;
  const router = useRouter();
  const queryClient = useQueryClient();
  const setKey = useSessionStore((s) => s.setKey);
  const markJustLoggedIn = useNavigationStore((s) => s.markJustLoggedIn);

  const handleEnter = () => {
    if (!isReady) return;

    queryClient.clear();

    useGameStore.getState().reset();

    disconnectSocket();

    setKey(username.trim(), rememberMe);

    markJustLoggedIn();

    router.replace('/');
  };

  return {
    username,
    rememberMe,
    isReady,
    hasCyrillicError,
    setUsername,
    setRememberMe,
    handleEnter,
  };
};
