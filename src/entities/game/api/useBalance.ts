import { useEffect } from 'react';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/shared/lib/apiClient';
import { type Balance } from '@/shared/types/api';
import { API_ROUTES } from '@/shared/config/apiRoutes';
import { queryKey } from '../model/queryKeys';
import { useGameStore } from '../model/store';

export const useBalance = () => {
  const setBalance = useGameStore((s) => s.setBalance);
  const query = useQuery(
    queryOptions({
      queryKey: queryKey.balance,
      queryFn: () => apiClient<Balance>(API_ROUTES.balance),
    })
  );

  useEffect(() => {
    if (query.data) {
      setBalance(query.data.balance);
    }
  }, [query.data, setBalance]);

  return query;
};
