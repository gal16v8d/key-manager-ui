import ENV from '@/constants/KeyManagerConstants';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageFooter from './layout/PageFooter';
import PageHeader from './layout/PageHeader';
import AccountListPage from './page/AccountListPage';
import LoginController from './page/LoginPage';
import type { ReactElement } from 'react';

const KeyManagerApp = (): ReactElement => {
  return (
    <BrowserRouter>
      <>
        <PageHeader />
        <Routes>
          <Route path={ENV.ROUTES.INDEX} element={<LoginController />} />
          <Route path={ENV.ROUTES.ACCOUNTS} element={<AccountListPage />} />
        </Routes>
        <PageFooter />
      </>
    </BrowserRouter>
  );
};

export default KeyManagerApp;
