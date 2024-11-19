import { http, HttpResponse } from 'msw';
import VALUES from '@/constants/KeyManagerConstants';
import accountsJson from './__mocks__/accounts.json';
import authJson from './__mocks__/auth.json';

const handlers = [
  http.get(`*${VALUES.API.ACCOUNTS_URL}/*/*`, () =>
    HttpResponse.json(accountsJson[0], { status: 200})
  ),
  http.get(`*${VALUES.API.ACCOUNTS_URL}/*`, () =>
    HttpResponse.json(accountsJson, { status: 200})
  ),
  http.post(`*${VALUES.API.AUTH_URL}`, () =>
    HttpResponse.json(authJson, { status: 200})
  ),
];

export default handlers;
