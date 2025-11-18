import type { ReactElement } from 'react';
import { useKmgrContext } from '@/provider/KmgrContext';
import './PageFooter.css';

const PageFooter = (): ReactElement => {
  const { t } = useKmgrContext();

  return (
    <footer className="footer">
      <p className="footer__text">
        &copy; {t('app.name')}, {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default PageFooter;
