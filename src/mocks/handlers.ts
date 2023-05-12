import { rest } from 'msw';
import VALUES from '@/constants/KeyManagerConstants';
import accountsJson from './__mocks__/accounts.json';
import authJson from './__mocks__/auth.json';

const handlers = [
  rest.get(`*${VALUES.API.ACCOUNTS_URL}/*/*`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(accountsJson[0]))
  ),
  rest.get(`*${VALUES.API.ACCOUNTS_URL}/*`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(accountsJson))
  ),
  rest.post(`*${VALUES.API.AUTH_URL}`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(authJson))
  ),
];

export default handlers;
