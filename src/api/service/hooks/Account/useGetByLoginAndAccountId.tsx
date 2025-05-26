import { AccountLogin } from '@/api/model/AccountLogin';
import { getByLoginAndAccountId } from '@/api/service/AccountService';
import ENV from '@/constants/KeyManagerConstants';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const useGetByLoginAndAccountId = (
  login: string,
  accountId?: number,
  payload?: {
    onSuccess?: (response: AccountLogin) => void;
    onError?: (error: any) => void;
    enabled?: boolean;
    cacheTime?: number;
    refetchOnMount?: boolean;
  }
): UseQueryResult<AccountLogin> => {
  const safeCodigoCuenta = accountId ?? 0;
  const queryKey = ENV.QUERY_KEYS.GET_BY_LOGIN_AND_ACCOUNTID(
    login,
    safeCodigoCuenta
  );
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      return await getByLoginAndAccountId(login, safeCodigoCuenta);
    },
    cacheTime: payload?.cacheTime ?? undefined,
    enabled: payload?.enabled === undefined || payload?.enabled,
    onSuccess: (response: AccountLogin) => {
      payload?.onSuccess && payload.onSuccess(response);
    },
    onError: (error: any) => {
      console.error('useGetByLoginAndAccountId', error?.response);
      payload?.onError && payload.onError(error);
    },
    refetchOnMount:
      payload?.refetchOnMount === undefined || payload.refetchOnMount,
  });
};

export default useGetByLoginAndAccountId;
