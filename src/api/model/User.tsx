import { Login } from './Login';

export class User extends Login {
  firstName?: string;
  lastName?: string;
  passwordAgain?: string;

  constructor(res?: User) {
    super(res);
    Object.assign(this, res);
  }
}
