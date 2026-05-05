import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  apiKey: string | null;
  rememberMe: boolean;
  setKey: (key: string, remember: boolean) => void;
  clear: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      apiKey: null,
      rememberMe: false,
      setKey: (apiKey, rememberMe) => set({ apiKey, rememberMe }),
      clear: () => set({ apiKey: null, rememberMe: false }),
    }),
    {
      name: 'session-store',
    }
  )
);
