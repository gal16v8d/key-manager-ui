import KeyManagerApp from '@/component/KeyManagerApp';
import { KmgrProvider } from '@/provider/KmgrProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { FC } from 'react';
import { RecoilRoot } from 'recoil';
import './app.css';

const App: FC = () => {
  console.log(
    `Running Key Manager UI Version: ${import.meta.env.VITE_APP_VERSION}`
  );

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <KmgrProvider>
          <KeyManagerApp />
        </KmgrProvider>
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default App;
