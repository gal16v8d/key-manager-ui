const ACCOUNTS = '/login-accounts';

const VALUES = {
  API: {
    AUTH_URL: `/auth/login`,
    ACCOUNTS_URL: `/api${ACCOUNTS}`,
  },
  MSG_LIFE: 5000,
  MSG_TYPE: {
    SUCCESS: 'success',
    ERROR: 'error',
  },
  QUERY_KEYS: {
    GET_ALL_BY_LOGIN: (login: string): string => `${ACCOUNTS}-${login}`,
    GET_BY_LOGIN_AND_ACCOUNTID: (login: string, accountId: number): string =>
      `${ACCOUNTS}-${login}-${accountId}`,
  },
  ROUTES: {
    INDEX: '/',
    ACCOUNTS: ACCOUNTS,
  },
};

export default VALUES;
