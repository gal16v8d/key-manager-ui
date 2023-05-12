import { render, screen } from '@testing-library/react';
import PageFooter from '../PageFooter';

test('render PageFooter component', () => {
  render(<PageFooter />);
  const footerText = screen.getByText(/KeyManager/i);
  expect(footerText).toBeDefined();
});
