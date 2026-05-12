'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  apiKey: string | null;
  rememberMe: boolean;
  _hasHydrated: boolean;
  setKey: (key: string, remember: boolean) => void;
  setHasHydrated: (state: boolean) => void;
  clear: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      apiKey: null,
      rememberMe: false,
      _hasHydrated: false,
      setKey: (apiKey, rememberMe) => set({ apiKey, rememberMe }),
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      clear: () => set({ apiKey: null, rememberMe: false }),
    }),
    {
      name: 'session-store',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        apiKey: state.apiKey,
        rememberMe: state.rememberMe,
      }),
    }
  )
);
