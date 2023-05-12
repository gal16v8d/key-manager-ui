import { act, renderWithBaseProviders, screen } from '@/testutils/testutils';
import App from '../App';

test('renders app', async () => {
  await act(() => renderWithBaseProviders(<App />));
  const subTitleHeader = screen.getByText(/Account Management/i);
  expect(subTitleHeader).toBeDefined();
});
