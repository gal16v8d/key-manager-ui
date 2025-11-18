import { AccountLogin } from '@/api/model/AccountLogin';
import ENV from '@/constants/KeyManagerConstants';
import axios from 'axios';

const getAllByLogin = async (login: string): Promise<Array<AccountLogin>> => {
  console.log(`Calling: ${ENV.API.ACCOUNTS_URL}/${login}`);
  const response = await axios.get(`${ENV.API.ACCOUNTS_URL}/${login}`);
  return response?.data;
};

const getByLoginAndAccountId = async (
  login: string,
  accountId: number
): Promise<AccountLogin> => {
  console.log(`Calling: ${ENV.API.ACCOUNTS_URL}/${login}/${accountId}`);
  const response = await axios.get(
    `${ENV.API.ACCOUNTS_URL}/${login}/${accountId}`
  );
  return response?.data;
};

const createAccount = async (account: AccountLogin): Promise<AccountLogin> => {
  console.log(`Calling: ${ENV.API.ACCOUNTS_URL}/${account?.userLogin}`);
  const response = await axios.post(
    `${ENV.API.ACCOUNTS_URL}/${account?.userLogin}`,
    account
  );
  return response?.data;
};

const updateAccount = async (account: AccountLogin): Promise<AccountLogin> => {
  console.log(
    `Calling: ${ENV.API.ACCOUNTS_URL}/${account?.userLogin}/${account?.id}`,
    account
  );
  const response = await axios.put(
    `${ENV.API.ACCOUNTS_URL}/${account?.userLogin}/${account?.id}`,
    account
  );
  return response?.data;
};

const deleteAccount = async (
  login: string,
  accountId: number
): Promise<void> => {
  console.log(`Calling: ${ENV.API.ACCOUNTS_URL}/${login}/${accountId}`);
  await axios.delete(`${ENV.API.ACCOUNTS_URL}/${login}/${accountId}`);
};

export {
  getAllByLogin,
  getByLoginAndAccountId,
  createAccount,
  updateAccount,
  deleteAccount,
};
