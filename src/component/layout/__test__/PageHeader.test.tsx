import { KmgrProvider } from '@/provider/KmgrProvider';
import { renderWithBaseProviders, screen } from '@/testutils/testutils';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import PageHeader from '../PageHeader';

const title = () => screen.getByText(/KeyManager/i);
const subtitle = () => screen.getByText(/Account Management/i);

test('render PageHeader component', () => {
  renderWithBaseProviders(
    <BrowserRouter>
      <RecoilRoot>
        <KmgrProvider>
          <PageHeader />
        </KmgrProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
  expect(title()).toBeDefined();
  expect(subtitle()).toBeDefined();
});
