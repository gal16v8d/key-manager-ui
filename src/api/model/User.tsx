import { Login } from './Login';

export class User extends Login {
  firstName?: string;
  lastName?: string;
  passwordAgain?: string;

  constructor(res?: any) {
    super(res);
    Object.assign(this, res);
  }
}
