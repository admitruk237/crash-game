'use client';

import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

interface SessionState {
  apiKey: string | null;
  rememberMe: boolean;
  _hasHydrated: boolean;
  setKey: (key: string, remember: boolean) => void;
  setHasHydrated: (state: boolean) => void;
  clear: () => void;
}

const STORAGE_NAME = 'session-store';

const hybridStorage: StateStorage = {
  getItem: (name) => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(name) ?? window.sessionStorage.getItem(name);
  },
  setItem: (name, value) => {
    if (typeof window === 'undefined') return;
    let remember = false;
    try {
      const parsed = JSON.parse(value) as { state?: { rememberMe?: boolean } };
      remember = parsed?.state?.rememberMe ?? false;
    } catch {
      remember = false;
    }
    if (remember) {
      window.localStorage.setItem(name, value);
      window.sessionStorage.removeItem(name);
    } else {
      window.sessionStorage.setItem(name, value);
      window.localStorage.removeItem(name);
    }
  },
  removeItem: (name) => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(name);
    window.sessionStorage.removeItem(name);
  },
};

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
      name: STORAGE_NAME,
      storage: createJSONStorage(() => hybridStorage),
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
