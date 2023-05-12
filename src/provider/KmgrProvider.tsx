import { TFunction } from 'i18next';
import { Messages } from 'primereact/messages';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface KmgrContextProps {
  t: TFunction<'translation', undefined>;
  message: React.RefObject<Messages>;
}

const KmgrContext = React.createContext<KmgrContextProps | undefined>(
  undefined
);

const KmgrProvider = (
  props: React.PropsWithChildren<Record<string, unknown>>
): JSX.Element => {
  const { t } = useTranslation();
  const message = React.useRef<Messages>(null);

  return (
    <KmgrContext.Provider value={{ t, message }}>
      {props.children}
    </KmgrContext.Provider>
  );
};

const useKmgrContext = (): KmgrContextProps => {
  const context = React.useContext(KmgrContext);
  if (context === undefined) {
    throw new Error('useKmgrContext must be used within KmgrProvider');
  }
  return context;
};

export { KmgrProvider, useKmgrContext };
