import { useEffect, useState } from 'react';

export const useCountdown = (endsAt: Date | null): number => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, []);

  if (!endsAt) return 0;
  return Math.max(0, Math.ceil((endsAt.getTime() - now) / 1000));
};
