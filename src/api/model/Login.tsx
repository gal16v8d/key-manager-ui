export class Login {
  login?: string;
  password?: string;

  constructor(res?: Login) {
    Object.assign(this, res);
  }
}
