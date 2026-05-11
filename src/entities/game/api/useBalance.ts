import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';
import { API_ROUTES } from '@/shared/config/apiRoutes';
import { queryKey } from '../model/queryKeys';
import { useSocketEvent } from '@/shared/lib/hooks/useSocketEvent';
import type { Balance } from '@/shared/types/api';

export const useBalance = () => {
  const queryClient = useQueryClient();

  useSocketEvent(['bet:placed', 'bet:cashedOut', 'bet:lost'], (payload: { balance: number }) => {
    queryClient.setQueryData<Balance>(queryKey.balance, { balance: payload.balance });
  });

  return useQuery({
    queryKey: queryKey.balance,
    queryFn: () => apiClient<Balance>(API_ROUTES.balance),
    staleTime: Infinity,
  });
};
