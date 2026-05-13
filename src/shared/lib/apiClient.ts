import { API_BASE_URL } from '../config/env';

interface ApiRequestInit extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

interface ApiConfig {
  getToken: () => string | null;
  onUnauthorized: () => void;
}

let config: ApiConfig = {
  getToken: () => null,
  onUnauthorized: () => {},
};

export const setApiConfig = (newConfig: Partial<ApiConfig>) => {
  config = { ...config, ...newConfig };
};

export const apiClient = async <T>(path: string, init?: ApiRequestInit): Promise<T> => {
  const apiKey = config.getToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    body: init?.body ? JSON.stringify(init.body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': encodeURIComponent(apiKey ?? ''),
      ...init?.headers,
    },
  });

  if (response.status === 401) {
    if (apiKey) {
      config.onUnauthorized();
    }
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as { error?: string };
    const errorMessage = data.error || response.statusText || `Error ${response.status}`;
    throw new Error(errorMessage);
  }
  return response.json() as Promise<T>;
};
