import { AccountLogin } from '@/api/model/AccountLogin';
import type { ApiError } from '@/api/model/response/ApiError';
import { getByLoginAndAccountId } from '@/api/service/AccountService';
import ENV from '@/constants/KeyManagerConstants';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const useGetByLoginAndAccountId = (
  login: string,
  accountId?: number,
  payload?: {
    onSuccess?: (response: AccountLogin) => void;
    onError?: (error: ApiError) => void;
    enabled?: boolean;
    gcTime?: number;
    staleTime?: number;
    refetchOnMount?: boolean;
  }
): UseQueryResult<AccountLogin, ApiError> => {
  const safeAccountId = accountId ?? 0;
  const queryKey = ENV.QUERY_KEYS.GET_BY_LOGIN_AND_ACCOUNTID(
    login,
    safeAccountId
  );
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => getByLoginAndAccountId(login, safeAccountId),
    ...{
      gcTime: payload?.gcTime ?? undefined,
      staleTime: payload?.staleTime ?? undefined,
      enabled: payload?.enabled === undefined || payload?.enabled,
      onSuccess: (response: AccountLogin) => payload?.onSuccess?.(response),
      onError: (error: ApiError) => {
        console.error('useGetByLoginAndAccountId', error?.response);
        payload?.onError?.(error);
      },
      refetchOnMount:
        payload?.refetchOnMount === undefined || payload.refetchOnMount,
    },
  });
};

export default useGetByLoginAndAccountId;
