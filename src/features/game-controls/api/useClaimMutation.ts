import { API_ROUTES } from '@/shared/config';
import { apiClient, ApiError } from '@/shared/lib';
import { type ClaimResponse } from '@/shared/types';
import { queryKey } from '@/entities/game';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const formatTimeLeft = (ms: number): string => {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export const useClaimMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiClient<ClaimResponse>(API_ROUTES.claim, { method: 'POST' }),
    onSuccess: (data) => {
      const msLeft = new Date(data.nextClaimAt).getTime() - Date.now();
      toast.success(`+${data.amount} coins claimed!`, {
        description: msLeft > 0 ? `Next bonus in ${formatTimeLeft(msLeft)}` : undefined,
        className: 'toast-claim',
        duration: 5000,
      });
      queryClient.invalidateQueries({ queryKey: queryKey.balance });
    },
    onError: (error) => {
      if (error instanceof ApiError && error.status === 429) {
        const msLeft = typeof error.data.retryAfterMs === 'number' ? error.data.retryAfterMs : 0;
        toast.error('Bonus is on cooldown', {
          description: msLeft > 0 ? `Next bonus in ${formatTimeLeft(msLeft)}` : undefined,
          className: 'toast-claim',
          duration: 5000,
        });
      }
    },
  });
};
