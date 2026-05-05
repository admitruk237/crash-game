import { io, type Socket } from 'socket.io-client';
import { WS_URL } from '../config/env';
import { useSessionStore } from '@/entities/session/model/store';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (socket) return socket;

  const apiKey = useSessionStore.getState().apiKey;
  if (!apiKey) throw new Error('Cannot connect WS without API Key');

  socket = io(WS_URL, { auth: { apiKey } });

  return socket;
};

export const disconnectSocket = (): void => {
  socket?.disconnect();
  socket = null;
};
