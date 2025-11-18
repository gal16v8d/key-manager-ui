import { AccountLogin } from '@/api/model/AccountLogin';
import type { ApiError } from '@/api/model/response/ApiError';
import type {
  AccountData,
  AccountDeleteData,
} from '@/api/model/request/AccountData';
import {
  createAccount,
  deleteAccount,
  updateAccount,
} from '@/api/service/AccountService';
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const usePostAccount = (): UseMutationResult<
  AccountLogin,
  ApiError,
  AccountData,
  unknown
> =>
  useMutation({
    mutationFn: ({ account }: AccountData) => createAccount(account),
    onError: (err: ApiError) => console.error('usePostAccount', err?.response),
  });

const usePutAccount = (): UseMutationResult<
  unknown,
  ApiError,
  AccountData,
  unknown
> =>
  useMutation({
    mutationFn: ({ account }: AccountData) => updateAccount(account),
    onError: (err: ApiError) => console.error('usePutAccount', err?.response),
  });

const useDeleteAccount = (): UseMutationResult<
  void,
  ApiError,
  AccountDeleteData,
  unknown
> =>
  useMutation({
    mutationFn: ({ login, accountId }: AccountDeleteData) =>
      deleteAccount(login, accountId),
    onError: (err: ApiError) =>
      console.error('useDeleteAccount', err?.response),
  });

export { usePostAccount, usePutAccount, useDeleteAccount };
