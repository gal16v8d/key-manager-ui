import { AccountLogin } from '@/api/model/AccountLogin';
import type { ApiError } from '@/api/model/response/ApiError';
import { getAllByLogin } from '@/api/service/AccountService';
import ENV from '@/constants/KeyManagerConstants';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const useGetAllByLogin = (
  userLogin: string,
  payload?: {
    onSuccess?: (response: Array<AccountLogin>) => void;
    onError?: (error: ApiError) => void;
    enabled?: boolean;
    gcTime?: number;
    staleTime?: number;
    refetchOnMount?: boolean;
  }
): UseQueryResult<Array<AccountLogin>, ApiError> => {
  const queryKey = ENV.QUERY_KEYS.GET_ALL_BY_LOGIN(userLogin);
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => getAllByLogin(userLogin),
    ...{
      gcTime: payload?.gcTime ?? undefined,
      staleTime: payload?.staleTime ?? undefined,
      enabled: payload?.enabled === undefined || payload?.enabled,
      onSuccess: (response: Array<AccountLogin>) =>
        payload?.onSuccess?.(response),
      onError: (error: ApiError) => {
        console.error('useGetAllByLogin', error?.response);
        payload?.onError?.(error);
      },
      refetchOnMount:
        payload?.refetchOnMount === undefined || payload.refetchOnMount,
    },
  });
};

export default useGetAllByLogin;
