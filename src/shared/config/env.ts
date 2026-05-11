const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`${key} is not defined`);
  return value.replace(/\/$/, '');
};

export const API_BASE_URL: string =
  typeof window !== 'undefined' ? getEnv('NEXT_PUBLIC_API_URL') : '';

export const WS_URL: string =
  typeof window !== 'undefined' ? getEnv('NEXT_PUBLIC_WS_URL') : '';
