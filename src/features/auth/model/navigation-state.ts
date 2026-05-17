'use client';

import { create } from 'zustand';

interface NavigationState {
  justLoggedIn: boolean;
  markJustLoggedIn: () => void;
  consumeJustLoggedIn: () => boolean;
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  justLoggedIn: false,
  markJustLoggedIn: () => set({ justLoggedIn: true }),
  consumeJustLoggedIn: () => {
    const value = get().justLoggedIn;
    if (value) {
      set({ justLoggedIn: false });
    }
    return value;
  },
}));
