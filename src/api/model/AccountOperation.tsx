import { AccountLogin } from './AccountLogin';

interface AccountOperation {
  accountData?: AccountLogin;
  addPressed?: boolean;
  deletePressed?: boolean;
}

export default AccountOperation;
