'use client';

import { useEffect } from 'react';
import { getSocket } from '@/shared/lib/socket';
import { useGameStore } from './store';
import { useRecentStore } from './recentStore';
import { WS_EVENTS } from '@/shared/config/wsEvents';
import { BET_STATUS, CONNECTION_STATUS, GAME_PHASES } from '@/shared/config/gameConstants';
import type {
  BetCashedOutEvent,
  BetLostEvent,
  BetPlacedEvent,
  BetRejectedEvent,
  RoundCrashEvent,
  RoundStartEvent,
  RoundStateEvent,
  RoundTickEvent,
  RoundWaitingEvent,
} from '@/shared/types/ws';

export const useGameSocket = () => {
  useEffect(() => {
    const s = getSocket();

    const onState = (e: RoundStateEvent) => {
      const game = useGameStore.getState();
      game.setPhase(e.phase);
      game.setRoundId(e.roundId);
      game.setMultiplier(e.currentMultiplier);
      game.setStartedAt(e.startedAt ? new Date(e.startedAt) : null);
      game.setEndsAt(e.endsAt ? new Date(e.endsAt) : null);
      game.setCrashPoint(e.crashPoint);
      game.setMyBet(e.yourBet ? { betId: '', ...e.yourBet } : null);
      game.setPlayerCount(e.playerCount);
    };

    const onWaiting = (e: RoundWaitingEvent) => {
      const game = useGameStore.getState();
      game.setPhase(GAME_PHASES.WAITING);
      game.setRoundId(e.roundId);
      game.setEndsAt(new Date(e.endsAt));
      game.setMultiplier(1);
      game.setMyBet(null);
      game.setCrashPoint(null);
    };

    const onStart = (e: RoundStartEvent) => {
      const game = useGameStore.getState();
      game.setPhase(GAME_PHASES.RUNNING);
      game.setStartedAt(new Date(e.startedAt));
      game.setEndsAt(null);
      game.setPlayerCount(e.playerCount);
      game.setMultiplier(1);
    };

    const onTick = (e: RoundTickEvent) => {
      if (e.roundId !== useGameStore.getState().roundId) return;
      useGameStore.getState().setMultiplier(e.multiplier);
    };

    const onCrash = (e: RoundCrashEvent) => {
      const game = useGameStore.getState();
      game.setPhase(GAME_PHASES.CRASHED);
      game.setMultiplier(e.crashPoint);
      game.setCrashPoint(e.crashPoint);
      useRecentStore.getState().prepend({
        roundId: e.roundId,
        crashPoint: e.crashPoint,
        crashedAt: new Date().toISOString(),
      });
    };

    const onBetPlaced = (e: BetPlacedEvent) => {
      const game = useGameStore.getState();
      game.setMyBet({
        betId: e.betId,
        amount: e.amount,
        autoCashOutAt: e.autoCashOutAt,
        status: BET_STATUS.PLACED,
      });
      game.setBalance(e.balance);
      game.setActionInFlight(false);
    };

    const onCashedOut = (e: BetCashedOutEvent) => {
      const game = useGameStore.getState();
      game.setBalance(e.balance);
      game.setMyBet(null);
      game.setActionInFlight(false);
    };

    const onLost = (e: BetLostEvent) => {
      const game = useGameStore.getState();
      game.setBalance(e.balance);
      game.setMyBet(null);
      game.setActionInFlight(false);
    };

    const onRejected = (e: BetRejectedEvent) => {
      console.error(WS_EVENTS.BET_REJECTED, e.message);
      useGameStore.getState().setActionInFlight(false);
    };

    const onConnect = () =>
      useGameStore.getState().setConnectionStatus(CONNECTION_STATUS.CONNECTED);
    const onDisconnect = () =>
      useGameStore.getState().setConnectionStatus(CONNECTION_STATUS.DISCONNECTED);

    s.on(WS_EVENTS.ROUND_STATE, onState);
    s.on(WS_EVENTS.ROUND_WAITING, onWaiting);
    s.on(WS_EVENTS.ROUND_START, onStart);
    s.on(WS_EVENTS.ROUND_TICK, onTick);
    s.on(WS_EVENTS.ROUND_CRASH, onCrash);
    s.on(WS_EVENTS.BET_PLACED, onBetPlaced);
    s.on(WS_EVENTS.BET_CASHED_OUT, onCashedOut);
    s.on(WS_EVENTS.BET_LOST, onLost);
    s.on(WS_EVENTS.BET_REJECTED, onRejected);
    s.on(WS_EVENTS.CONNECT, onConnect);
    s.on(WS_EVENTS.DISCONNECT, onDisconnect);

    return () => {
      s.off(WS_EVENTS.ROUND_STATE, onState);
      s.off(WS_EVENTS.ROUND_WAITING, onWaiting);
      s.off(WS_EVENTS.ROUND_START, onStart);
      s.off(WS_EVENTS.ROUND_TICK, onTick);
      s.off(WS_EVENTS.ROUND_CRASH, onCrash);
      s.off(WS_EVENTS.BET_PLACED, onBetPlaced);
      s.off(WS_EVENTS.BET_CASHED_OUT, onCashedOut);
      s.off(WS_EVENTS.BET_LOST, onLost);
      s.off(WS_EVENTS.BET_REJECTED, onRejected);
      s.off(WS_EVENTS.CONNECT, onConnect);
      s.off(WS_EVENTS.DISCONNECT, onDisconnect);
    };
  }, []);
};
