import { Messages } from 'primereact/messages';
import type { ReactElement, PropsWithChildren } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { KmgrContext } from './KmgrContext';

export const KmgrProvider = (
  props: PropsWithChildren<Record<string, unknown>>
): ReactElement => {
  const { t } = useTranslation();
  const message = useRef<Messages>(null);

  return (
    <KmgrContext.Provider value={{ t, message }}>
      {props.children}
    </KmgrContext.Provider>
  );
};
