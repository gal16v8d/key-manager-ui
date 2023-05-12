import { loginState } from '@/api/service/recoil/atoms/loginAtoms';
import ENV from '@/constants/KeyManagerConstants';
import { useKmgrContext } from '@/provider/KmgrProvider';
import { Link } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

const PageHeader = () => {
  const { t } = useKmgrContext();
  const loggedUser = useRecoilValue(loginState);
  const resetLoginData = useResetRecoilState(loginState);

  return (
    <header>
      <section className="hero is-link">
        <div className="hero-head">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <a className="navbar-item" href="https://bulma.io">
                <img
                  src="https://bulma.io/images/bulma-logo.png"
                  alt="logo"
                  width="112"
                  height="28"
                />
              </a>
            </div>

            {loggedUser && (
              <div className="navbar-menu">
                <div className="navbar-start">
                  <Link className="navbar-item" to={ENV.ROUTES.ACCOUNTS}>
                    {t('header.accounts')}
                  </Link>
                </div>
                <div className="navbar-end">
                  <Link
                    className="navbar-item"
                    to={ENV.ROUTES.INDEX}
                    onClick={resetLoginData}
                  >
                    {t('header.logout')}
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>

        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">KeyManager</h1>
            <h2 className="subtitle">{t('header.subtitle')}</h2>
          </div>
        </div>
      </section>
    </header>
  );
};

export default PageHeader;
