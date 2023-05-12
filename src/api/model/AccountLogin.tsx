import { Login } from './Login';

export class AccountLogin extends Login {
  id?: number;
  userLogin?: string;
  accountName?: string;
  url?: string;

  constructor(res?: any) {
    super(res);
    Object.assign(this, res);
  }
}
