/* eslint-disable @typescript-eslint/no-explicit-any */
import { AccountLogin } from '@/api/model/AccountLogin';
import {
  createAccount,
  deleteAccount,
  updateAccount,
} from '@/api/service/AccountService';
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const usePostAccount = (): UseMutationResult<
  any,
  any,
  {
    account: AccountLogin;
  },
  unknown
> => {
  return useMutation(
    ({ account }: { account: AccountLogin }) => createAccount(account),
    {
      onError: (err: any) => console.error('createAccount', err?.response),
    }
  );
};

const usePutAccount = (): UseMutationResult<
  any,
  any,
  {
    account: AccountLogin;
  },
  unknown
> => {
  return useMutation(
    ({ account }: { account: AccountLogin }) => updateAccount(account),
    {
      onError: (err: any) => console.error('usePutAccount', err?.response),
    }
  );
};

const useDeleteAccount = (): UseMutationResult<
  any,
  any,
  {
    login: string;
    accountId: number;
  },
  unknown
> => {
  return useMutation(
    ({ login, accountId }: { login: string; accountId: number }) =>
      deleteAccount(login, accountId),
    {
      onError: (err: any) => {
        console.error('useDeleteAccount', err?.response);
      },
    }
  );
};

export { usePostAccount, usePutAccount, useDeleteAccount };
