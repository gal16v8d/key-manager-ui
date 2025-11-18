import { AccountLogin } from '@/api/model/AccountLogin';
import type { AccountOperation } from '@/api/model/AccountOperation';
import type { ApiError } from '@/api/model/response/ApiError';
import {
  useDeleteAccount,
  usePostAccount,
  usePutAccount,
} from '@/api/service/hooks/Account/useAccountService';
import useGetByLoginAndAccountId from '@/api/service/hooks/Account/useGetByLoginAndAccountId';
import { useKmgrContext } from '@/provider/KmgrContext';
import type { severity } from '@/types/severity';
import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './AccountModal.css';

interface AccountProps {
  accountOperation: AccountOperation;
  loggedUser: string;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<Array<unknown>, ApiError>>;
  showMessage: (summary: string, type: severity, message: string) => void;
}

const AccountModal: FC<AccountProps> = ({
  accountOperation,
  loggedUser,
  refetch,
  showMessage,
}) => {
  const { t } = useKmgrContext();
  const initialAccountState = () => {
    const accountLogin: AccountLogin = new AccountLogin();
    accountLogin.accountName = '';
    accountLogin.login = '';
    accountLogin.password = '';
    accountLogin.url = '';
    accountLogin.userLogin = loggedUser;
    return accountLogin;
  };
  const [account, setAccount] = useState(initialAccountState);
  const [displayDialog, setDisplayDialog] = useState<boolean>(false);
  const [hidePass, setHidePass] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountLogin>();

  const postAccount = usePostAccount();
  const putAccount = usePutAccount();
  const deleteAccount = useDeleteAccount();

  const { data: hookData } = useGetByLoginAndAccountId(
    loggedUser,
    accountOperation?.accountData?.id,
    {
      enabled: !!loggedUser && !!accountOperation?.accountData?.id,
      onError: (error: ApiError) => {
        setDisplayDialog(false);
        showMessage(
          `Error retrieving account ${accountOperation?.accountData?.id} - `,
          'error',
          `status: ${error.response.status}`
        );
      },
    }
  );

  const goBackToList = async (
    msg: string,
    showMsg: string,
    msgType: severity
  ) => {
    setDisplayDialog(false);
    await refetch();
    showMessage(showMsg, msgType, msg);
  };

  const performDelete = async (rowdata: AccountLogin) => {
    await deleteAccount
      .mutateAsync({
        login: loggedUser,
        accountId: rowdata?.id ?? 0,
      })
      .then(() =>
        goBackToList(
          `${account.accountName}`,
          t('accountModal.deletedMsg'),
          'success'
        )
      )
      .catch(() =>
        goBackToList(
          `${account.accountName}`,
          t('accountModal.deletedErrorMsg'),
          'error'
        )
      );
  };

  useEffect(() => {
    if (accountOperation?.deletePressed && accountOperation?.accountData) {
      void performDelete(accountOperation?.accountData);
    } else if (accountOperation?.addPressed) {
      setAccount(initialAccountState());
      setDisplayDialog(true);
    }
  }, [accountOperation]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (hookData) {
      setAccount(hookData);
      setDisplayDialog(true);
    }
  }, [hookData]);

  const onSubmit = async (data: AccountLogin) => {
    data.id = accountOperation?.accountData?.id;
    data.userLogin = loggedUser;
    const accountLoginAux: AccountLogin = new AccountLogin(data);
    setAccount(accountLoginAux);
    await storeAccount(accountLoginAux);
  };

  const onCancel = () => {
    setDisplayDialog(false);
  };

  const toggleShow = () => {
    setHidePass(!hidePass);
  };

  const storeAccount = async (data: AccountLogin) => {
    if (accountOperation?.addPressed) {
      await performCreate(data);
    } else {
      await performUpdate(data);
    }
  };

  const performCreate = async (data: AccountLogin) => {
    await postAccount
      .mutateAsync({
        account: data,
      })
      .then(() =>
        goBackToList(
          `${account.accountName}`,
          t('accountModal.addMsg'),
          'success'
        )
      )
      .catch(() =>
        goBackToList(
          `${account.accountName}`,
          t('accountModal.addErrorMsg'),
          'error'
        )
      );
  };

  const performUpdate = async (data: AccountLogin) => {
    await putAccount
      .mutateAsync({
        account: data,
      })
      .then(() =>
        goBackToList(
          `${account.accountName}`,
          t('accountModal.updatedMsg'),
          'success'
        )
      )
      .catch(() =>
        goBackToList(
          `${account.accountName}`,
          t('accountModal.updatedErrorMsg'),
          'error'
        )
      );
  };

  const dialogOptions = (
    <div className="button-container">
      <Button
        label={t('accountModal.saveButton') ?? 'accountModal.saveButton'}
      />
      <Button
        label={t('accountModal.cancelButton') ?? 'accountModal.cancelButton'}
        className="p-button-warning"
        onClick={onCancel}
        type="button"
      />
    </div>
  );

  return (
    <>
      <br />
      <Dialog
        visible={displayDialog}
        style={{ width: '300px' }}
        header={t('accountModal.dialogHeader')}
        modal={true}
        onHide={() => setDisplayDialog(false)}
      >
        {account && (
          <div className="modal-form-container">
            <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="label">{t('accountModal.nameInput')}</label>
                <InputText
                  {...register('accountName', { required: true })}
                  className="input"
                  type="text"
                  name="accountName"
                  placeholder={
                    t('accountModal.nameInput') ?? 'accountModal.nameInput'
                  }
                  defaultValue={account.accountName}
                />
                {errors.accountName && <p>{t('validation.required')}</p>}
              </div>

              <div>
                <label className="label">{t('accountModal.loginInput')}</label>
                <br />
                <InputText
                  {...register('login', { required: true })}
                  className="input"
                  type="text"
                  name="login"
                  placeholder={t('accountModal.loginInput') ?? ''}
                  defaultValue={account.login}
                />
                {errors.login && <p>{t('validation.required')}</p>}
              </div>

              <div>
                <label className="label">{t('accountModal.passInput')}</label>
                <InputText
                  {...register('password', { required: true })}
                  className="input"
                  type={hidePass ? 'password' : 'text'}
                  name="password"
                  placeholder={
                    t('accountModal.passInput') ?? 'accountModal.passInput'
                  }
                  defaultValue={account.password}
                />
                {errors.password && <p>{t('validation.required')}</p>}
                <Button
                  label={
                    t('accountModal.passButton') ?? 'accountModal.passButton'
                  }
                  onClick={toggleShow}
                  type="button"
                />
              </div>

              <div>
                <label className="label">{t('accountModal.urlInput')}</label>
                <br />
                <InputText
                  {...register('url', { required: false })}
                  className="input"
                  type="text"
                  name="url"
                  placeholder={
                    t('accountModal.urlInput') ?? 'accountModal.urlInput'
                  }
                  defaultValue={account.url}
                />
              </div>
              {dialogOptions}
            </form>
          </div>
        )}
      </Dialog>
    </>
  );
};

export default AccountModal;
