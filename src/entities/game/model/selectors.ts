'use client';

import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from './store';

export const useIsBettingLocked = () => useGameStore((s) => s.phase !== 'waiting');

export const useMainButtonView = () =>
  useGameStore(
    useShallow((s) => ({
      phase: s.phase,
      myBet: s.myBet,
      crashPoint: s.crashPoint,
    }))
  );

export const useFooterView = () =>
  useGameStore(
    useShallow((s) => ({
      connectionStatus: s.connectionStatus,
      roundId: s.roundId,
      players: s.players,
    }))
  );

export const useGamePhase = () => useGameStore((s) => s.phase);
export const useMyBet = () => useGameStore((s) => s.myBet);
