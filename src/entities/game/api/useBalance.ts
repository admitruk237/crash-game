import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/shared/lib/apiClient';
import { type Balance } from '@/shared/types/api';
import { API_ROUTES } from '@/shared/config/apiRoutes';
import { queryKey } from '../model/queryKeys';
import { useGameStore } from '../model/store';

export const useBalance = () => {
  return useQuery(
    queryOptions({
      queryKey: queryKey.balance,
      queryFn: async () => {
        const data = await apiClient<Balance>(API_ROUTES.balance);
        useGameStore.getState().setBalance(data.balance);
        return data;
      },
    })
  );
};
