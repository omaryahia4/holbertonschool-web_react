import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './src/App';

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('it should check that the email input element will be focused whenever the associated label is clicked', async () => {
    const emailLabel = screen.getByText(/email/i);
    const emailInput = screen.getByLabelText(/email/i);

    userEvent.click(emailLabel);

    await waitFor(() => {
      expect(emailInput).toHaveFocus();
    });
  });
  
  test('it should check that the password input element will be focused whenever the associated label is clicked', async () => {
    const passwordLabel = screen.getByText(/password/i);
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.click(passwordLabel);
    await waitFor(() => {
      expect(passwordInput).toHaveFocus();
    });
  });
});