import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';
import { API_ROUTES } from '@/shared/config/apiRoutes';
import { queryKey } from '../model/queryKeys';
import { getSocket } from '@/shared/lib/socket';
import type { Balance } from '@/shared/types/api';

export const useBalance = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const s = getSocket();

    const setBalance = (payload: { balance: number }) => {
      queryClient.setQueryData<Balance>(queryKey.balance, { balance: payload.balance });
    };

    const onReconnect = () => {
      queryClient.invalidateQueries({ queryKey: queryKey.balance });
    };

    s.on('bet:placed', setBalance);
    s.on('bet:cashedOut', setBalance);
    s.on('bet:lost', setBalance);
    s.on('connect', onReconnect);

    return () => {
      s.off('bet:placed', setBalance);
      s.off('bet:cashedOut', setBalance);
      s.off('bet:lost', setBalance);
      s.off('connect', onReconnect);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: queryKey.balance,
    queryFn: () => apiClient<Balance>(API_ROUTES.balance),
    staleTime: Infinity,
  });
};
