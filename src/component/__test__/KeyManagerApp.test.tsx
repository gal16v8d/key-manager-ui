import { KmgrProvider } from '@/provider/KmgrProvider';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import KeyManagerApp from '../KeyManagerApp';

vi.mock('@/component/layout/PageHeader');
vi.mock('@/component/layout/PageFooter');
vi.mock('@/component/page/LoginPage');

describe('Tests for Router', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('Should render all route components', async () => {
    const header = await import('@/component/layout/PageHeader');
    header.default = vi.fn().mockImplementation(() => <div>HeaderMock</div>);
    const footer = await import('@/component/layout/PageFooter');
    footer.default = vi.fn().mockImplementation(() => <div>FooterMock</div>);
    const login = await import('@/component/page/LoginPage');
    login.default = vi.fn().mockImplementation(() => <div>LoginMock</div>);

    render(
      <RecoilRoot>
        <KmgrProvider>
          <KeyManagerApp />
        </KmgrProvider>
      </RecoilRoot>
    );
    expect(screen.getByText('HeaderMock')).toBeDefined();
    expect(screen.getByText('FooterMock')).toBeDefined();
    expect(screen.getByText('LoginMock')).toBeDefined();
  });
});
