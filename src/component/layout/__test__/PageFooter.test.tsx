import { KmgrProvider } from '@/provider/KmgrProvider';
import { renderWithBaseProviders, screen } from '@/testutils/testutils';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import PageFooter from '../PageFooter';

test('render PageFooter component', () => {
  renderWithBaseProviders(
    <BrowserRouter>
      <RecoilRoot>
        <KmgrProvider>
          <PageFooter />
        </KmgrProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
  const footerText = screen.getByText(/KeyManager/i);
  expect(footerText).toBeDefined();
});
