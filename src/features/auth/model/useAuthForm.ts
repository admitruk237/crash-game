import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/entities/session/model/store';
import { disconnectSocket, getSocket } from '@/shared/lib/socket';
import { markJustLoggedIn } from '@/shared/lib/navigation-state';

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
  const { setKey, apiKey } = useSessionStore();

  useEffect(() => {
    if (apiKey) {
      router.replace('/');
    }
  }, [apiKey, router]);

  const handleEnter = () => {
    if (!isReady) return;
    disconnectSocket();
    setKey(username.trim(), true);
    getSocket();
    markJustLoggedIn();
    router.push('/');
  };

  return {
    username,
    isReady,
    setUsername,
    handleEnter,
  };
};
