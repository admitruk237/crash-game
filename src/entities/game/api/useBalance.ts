import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/shared/lib/apiClient';
import { API_ROUTES } from '@/shared/config/apiRoutes';
import { queryKey } from '../model/queryKeys';
import { useSocketEvent } from '@/shared/lib/hooks/useSocketEvent';
import type { Balance } from '@/shared/types/api';
import type { BetCashedOutEvent, BetLostEvent, BetPlacedEvent } from '@/shared/types/ws';

type BalanceEvent = Pick<BetPlacedEvent | BetCashedOutEvent | BetLostEvent, 'balance'>;

export const useBalance = () => {
  const queryClient = useQueryClient();

  useSocketEvent<BalanceEvent>(['bet:placed', 'bet:cashedOut', 'bet:lost'], ({ balance }) => {
    queryClient.setQueryData<Balance>(queryKey.balance, { balance });
  });

  return useQuery({
    queryKey: queryKey.balance,
    queryFn: () => apiClient<Balance>(API_ROUTES.balance),
    staleTime: Infinity,
  });
};
