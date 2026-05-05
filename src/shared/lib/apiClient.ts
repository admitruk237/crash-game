import { useSessionStore } from '@/entities/session/model/store';
import { API_BASE_URL } from '../config/env';

export const apiClient = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const apiKey = useSessionStore.getState().apiKey;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
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
