'use client';

import { io, type Socket } from 'socket.io-client';
import { WS_URL } from '../config/env';

let socket: Socket | null = null;
let getToken: () => string | null = () => null;

export const setSocketConfig = (tokenGetter: () => string | null) => {
  getToken = tokenGetter;
};

export const getSocket = (): Socket => {
  if (socket) return socket;

  const apiKey = getToken();
  if (!apiKey) throw new Error('Cannot connect WS without API Key');

  socket = io(WS_URL, {
    auth: { apiKey },
    transports: ['websocket'],
  });

  return socket;
};

export const disconnectSocket = (): void => {
  socket?.disconnect();
  socket = null;
};
