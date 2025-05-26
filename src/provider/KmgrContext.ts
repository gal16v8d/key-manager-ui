import type { TFunction } from 'i18next';
import { Messages } from 'primereact/messages';
import type { RefObject } from 'react';
import { createContext, useContext } from 'react';

interface KmgrContextProps {
  t: TFunction<'translation', undefined>;
  message: RefObject<Messages>;
}

export const KmgrContext = createContext<KmgrContextProps | undefined>(
  undefined
);

export const useKmgrContext = (): KmgrContextProps => {
  const context = useContext(KmgrContext);
  if (context === undefined) {
    throw new Error('useKmgrContext must be used within KmgrProvider');
  }
  return context;
};
