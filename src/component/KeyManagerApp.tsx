import ENV from '@/constants/KeyManagerConstants';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageFooter from './layout/PageFooter';
import PageHeader from './layout/PageHeader';
import CuentasListController from './page/AccountListPage';
import LoginController from './page/LoginPage';

const KeyManagerApp = (): React.ReactElement => {
  return (
    <BrowserRouter>
      <>
        <PageHeader />
        <Routes>
          <Route path={ENV.ROUTES.INDEX} element={<LoginController />} />
          <Route
            path={ENV.ROUTES.ACCOUNTS}
            element={<CuentasListController />}
          />
        </Routes>
        <PageFooter />
      </>
    </BrowserRouter>
  );
};

export default KeyManagerApp;
