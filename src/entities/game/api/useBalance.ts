'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient, useSocketEvent } from '@/shared/lib';
import { API_ROUTES } from '@/shared/config';
import { queryKey } from '../model/queryKeys';
import type { Balance, BetCashedOutEvent, BetLostEvent, BetPlacedEvent } from '@/shared/types';

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
