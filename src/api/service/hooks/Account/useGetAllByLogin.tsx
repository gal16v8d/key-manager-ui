import { AccountLogin } from '@/api/model/AccountLogin';
import { getAllByLogin } from '@/api/service/AccountService';
import ENV from '@/constants/KeyManagerConstants';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

const useGetAllByLogin = (
  userLogin: string,
  payload?: {
    onSuccess?: (response: AccountLogin[]) => void;
    onError?: (error: any) => void;
    enabled?: boolean;
    cacheTime?: number;
    refetchOnMount?: boolean;
  }
): UseQueryResult<AccountLogin[]> => {
  const queryKey = ENV.QUERY_KEYS.GET_ALL_BY_LOGIN(userLogin);
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      return await getAllByLogin(userLogin);
    },
    cacheTime: payload?.cacheTime ?? undefined,
    enabled: payload?.enabled === undefined || payload?.enabled,
    onSuccess: (response: AccountLogin[]) => {
      payload?.onSuccess && payload.onSuccess(response);
    },
    onError: (error: any) => {
      console.error('useGetAllByLogin', error?.response);
      payload?.onError && payload.onError(error);
    },
    refetchOnMount:
      payload?.refetchOnMount === undefined || payload.refetchOnMount,
  });
};

export default useGetAllByLogin;
