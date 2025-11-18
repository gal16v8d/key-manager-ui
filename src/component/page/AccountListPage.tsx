import { AccountLogin } from '@/api/model/AccountLogin';
import type { AccountOperation } from '@/api/model/AccountOperation';
import useGetAllByLogin from '@/api/service/hooks/Account/useGetAllByLogin';
import { loginState } from '@/api/service/recoil/atoms/loginAtoms';
import ENV from '@/constants/KeyManagerConstants';
import { useKmgrContext } from '@/provider/KmgrContext';
import type { severity } from '@/types/severity';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Messages } from 'primereact/messages';
import { ProgressSpinner } from 'primereact/progressspinner';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import AccountModal from './AccountModal';
import './AccountListPage.css';

const AccountListPage = (): ReactElement => {
  const { t, message: messages } = useKmgrContext();
  const loggedUser = useRecoilValue(loginState);
  const navigate = useNavigate();
  const [accountOperation, setAccountOperation] = useState<AccountOperation>(
    {}
  );

  const {
    data: accounts,
    isLoading,
    refetch,
  } = useGetAllByLogin(loggedUser, {
    enabled: !!loggedUser,
    onError: () => {
      navigate(ENV.ROUTES.INDEX);
    },
  });

  const sendToEdit = (rowdata: AccountLogin) => {
    setAccountOperation({ accountData: rowdata });
  };

  const sendToDelete = (rowdata: AccountLogin) => {
    setAccountOperation({
      accountData: rowdata,
      deletePressed: true,
    });
  };

  const addNew = () => {
    setAccountOperation({ addPressed: true });
  };

  const showMessage = (summary: string, type: severity, message: string) => {
    messages?.current?.show({
      life: ENV.MSG_LIFE,
      severity: type,
      summary: `${summary}`,
      detail: message,
    });
  };

  const actionTemplate = (rowdata: AccountLogin) => {
    return (
      <div>
        <Button
          icon="pi pi-pencil"
          onClick={() => sendToEdit(rowdata)}
          tooltip={t('accountList.update') ?? 'accountList.update'}
        />
        <Button
          className="p-button-warning"
          icon="pi pi-trash"
          onClick={() => sendToDelete(rowdata)}
          tooltip={t('accountList.delete') ?? 'accountList.delete'}
        />
      </div>
    );
  };

  if (!loggedUser) {
    return <Navigate to={ENV.ROUTES.INDEX} replace />;
  }

  return (
    <>
      {!accounts ? (
        <ProgressSpinner
          style={{ width: '50px', height: '50px' }}
          strokeWidth="8"
          fill="#EEEEEE"
          animationDuration=".5s"
        />
      ) : (
        <div className="container">
          <br />
          {<Messages ref={messages} />}
          <div className="button-container">
            <Button
              icon="pi pi-plus"
              onClick={addNew}
              style={{ float: 'left' }}
              tooltip={t('accountList.add') ?? 'accountList.add'}
            />
          </div>
          <DataTable
            value={accounts}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            loading={isLoading}
          >
            <Column field="id" header={t('accountList.table.id')} />
            <Column
              field="accountName"
              header={t('accountList.table.name')}
              filter={true}
            />
            <Column
              field="account.login"
              header={t('accountList.table.user')}
              filter={true}
            />
            <Column
              field="login"
              header={t('accountList.table.userLogin')}
              filter={true}
            />
            <Column
              field="url"
              header={t('accountList.table.url')}
              filter={true}
            />
            <Column
              body={actionTemplate}
              style={{ textAlign: 'center', width: '8em' }}
              header={t('accountList.table.actions')}
            />
          </DataTable>
          <AccountModal
            accountOperation={accountOperation}
            loggedUser={loggedUser}
            refetch={refetch}
            showMessage={showMessage}
          />
        </div>
      )}
    </>
  );
};

export default AccountListPage;
