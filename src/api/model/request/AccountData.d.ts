import { AccountLogin } from '@/api/model/AccountLogin';

export type AccountData = {
    account: AccountLogin;
};

export type AccountDeleteData = {
    login: string;
    accountId: number;
};
