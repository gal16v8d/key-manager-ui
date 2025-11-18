import { loginState } from '@/api/service/recoil/atoms/loginAtoms';
import ENV from '@/constants/KeyManagerConstants';
import { useKmgrContext } from '@/provider/KmgrContext';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import './PageHeader.css';

const PageHeader = () => {
  const { t } = useKmgrContext();
  const navigate = useNavigate();
  const loggedUser = useRecoilValue(loginState);
  const resetLoginData = useResetRecoilState(loginState);

  const menuItems = [
    {
      label: t('header.accounts'),
      command: () => navigate(ENV.ROUTES.ACCOUNTS),
    },
    {
      label: t('header.logout'),
      command: () => {
        resetLoginData();
        navigate(ENV.ROUTES.INDEX);
      },
    },
  ];

  return (
    <header>
      <section className="hero is-link">
        <div className="hero-head">
          {loggedUser && <Menubar model={menuItems} />}
        </div>

        <header className="header">
          <h1 className="title">{t('app.name')}</h1>
          <h2 className="subtitle">{t('header.subtitle')}</h2>
        </header>
      </section>
    </header>
  );
};

export default PageHeader;
