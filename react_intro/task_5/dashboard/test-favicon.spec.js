import { render, screen } from '@testing-library/react';
import App from './src/App/App';

test('checks if favicon is used in the head', () => {
  render(<App />);

  const faviconLink = document.querySelector('link[type="image/x-icon"]');
  console.debug(faviconLink)
  expect(faviconLink).toBeInTheDocument();
  expect(faviconLink).toHaveAttribute('href', '/favicon.ico');
  expect(faviconLink).toHaveAttribute('type', 'image/svg+xml');
});
