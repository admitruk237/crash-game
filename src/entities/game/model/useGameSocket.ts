'use client';

import { useEffect } from 'react';
import { getSocket } from '@/shared/lib/socket';
import { useGameStore } from './store';
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
      game.setMyBet(e.yourBet);
      game.setPlayers(e.players);
    };

    const onWaiting = (e: RoundWaitingEvent) => {
      const game = useGameStore.getState();
      game.setPhase('waiting');
      game.setRoundId(e.roundId);
      game.setEndsAt(new Date(e.endsAt));
      game.setMultiplier(1);
      game.setMyBet(null);
      game.setCrashPoint(null);
      game.setPlayers(e.players);
    };

    const onStart = (e: RoundStartEvent) => {
      const game = useGameStore.getState();
      game.setPhase('running');
      game.setStartedAt(new Date(e.startedAt));
      game.setEndsAt(null);
      game.setPlayers(e.players);
      game.setMultiplier(1);
    };

    const onTick = (e: RoundTickEvent) => {
      if (e.roundId !== useGameStore.getState().roundId) return;
      useGameStore.getState().setMultiplier(e.multiplier);
    };

    const onCrash = (e: RoundCrashEvent) => {
      const game = useGameStore.getState();
      game.setPhase('crashed');
      game.setMultiplier(e.crashPoint);
      game.setCrashPoint(e.crashPoint);
      game.setPlayers(e.players);
    };

    const onBetPlaced = (e: BetPlacedEvent) => {
      const game = useGameStore.getState();
      game.setMyBet({
        betId: e.betId,
        amount: e.amount,
        autoCashOutAt: e.autoCashOutAt,
        status: 'placed',
      });
      if (game.actionInFlight) game.setActionInFlight(false);
    };

    const onCashedOut = (_e: BetCashedOutEvent) => {
      const game = useGameStore.getState();
      game.setMyBet(null);
      if (game.actionInFlight) game.setActionInFlight(false);
    };

    const onLost = (_e: BetLostEvent) => {
      const game = useGameStore.getState();
      game.setMyBet(null);
      if (game.actionInFlight) game.setActionInFlight(false);
    };

    const onRejected = (e: BetRejectedEvent) => {
      console.error('bet:rejected', e.message);
      const game = useGameStore.getState();
      if (game.actionInFlight) game.setActionInFlight(false);
    };

    const onConnect = () => useGameStore.getState().setConnectionStatus('connected');
    const onDisconnect = () => useGameStore.getState().setConnectionStatus('disconnected');

    s.on('round:state', onState);
    s.on('round:waiting', onWaiting);
    s.on('round:start', onStart);
    s.on('round:tick', onTick);
    s.on('round:crash', onCrash);
    s.on('bet:placed', onBetPlaced);
    s.on('bet:cashedOut', onCashedOut);
    s.on('bet:lost', onLost);
    s.on('bet:rejected', onRejected);
    s.on('connect', onConnect);
    s.on('disconnect', onDisconnect);

    return () => {
      s.off('round:state', onState);
      s.off('round:waiting', onWaiting);
      s.off('round:start', onStart);
      s.off('round:tick', onTick);
      s.off('round:crash', onCrash);
      s.off('bet:placed', onBetPlaced);
      s.off('bet:cashedOut', onCashedOut);
      s.off('bet:lost', onLost);
      s.off('bet:rejected', onRejected);
      s.off('connect', onConnect);
      s.off('disconnect', onDisconnect);
    };
  }, []);
};
