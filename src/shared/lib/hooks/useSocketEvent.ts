import { useEffect, useLayoutEffect, useRef } from 'react';

import { getSocket } from '../socket';

export const useSocketEvent = <T>(events: string | string[], callback: (data: T) => void) => {
  const cbRef = useRef(callback);
  useLayoutEffect(() => {
    cbRef.current = callback;
  });

  const eventsKey = Array.isArray(events) ? events.join(',') : events;

  useEffect(() => {
    let socket: ReturnType<typeof getSocket> | null = null;
    try {
      socket = getSocket();
    } catch {
      return;
    }

    const handler = (data: T) => cbRef.current(data);
    const eventList = eventsKey.split(',');

    eventList.forEach((e) => socket?.on(e, handler));

    return () => {
      eventList.forEach((e) => socket?.off(e, handler));
    };
  }, [eventsKey]);
};
