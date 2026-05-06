import { useSessionStore } from '@/entities/session/model/store';
import { API_BASE_URL } from '../config/env';

interface ApiRequestInit extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

export const apiClient = async <T>(path: string, init?: ApiRequestInit): Promise<T> => {
  const apiKey = useSessionStore.getState().apiKey;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    body: init?.body ? JSON.stringify(init.body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey ?? '',
      ...init?.headers,
    },
  });

  if (response.status === 401) {
    useSessionStore.getState().clear();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const { error } = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(error);
  }
  return response.json() as Promise<T>;
};
