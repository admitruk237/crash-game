import { API_BASE_URL } from '../config/env';

interface ApiRequestInit extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

interface ApiConfig {
  getToken: () => string | null;
  onUnauthorized: () => void;
}

export class ApiError extends Error {
  status: number;
  data: Record<string, unknown>;

  constructor(message: string, status: number, data: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.data = data;
  }
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
    throw new ApiError('Unauthorized', 401, {});
  }

  if (!response.ok) {
    const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
    const errorMessage =
      (data.error as string) || response.statusText || `Error ${response.status}`;
    throw new ApiError(errorMessage, response.status, data);
  }

  return response.json() as Promise<T>;
};
