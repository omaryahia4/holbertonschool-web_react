import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from "./src/App";

// testing login/logout features
test('should display CourseList and welcome message after login and hide them after logout', async () => {
  render(<App />);

  expect(screen.getByText('Log in to continue')).toBeInTheDocument();

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });

  await act(async () => {
    await userEvent.type(emailInput, 'email@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);
  });

  expect(screen.getByText('Course list')).toBeInTheDocument();

  const logoutLink = screen.getByRole('link', { name: /logout/i });
  await act(async () => {
    await userEvent.click(logoutLink);
  });


  await waitFor(() => {
    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
    expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
  });
});