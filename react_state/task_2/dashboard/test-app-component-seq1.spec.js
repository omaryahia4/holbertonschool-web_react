import React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from './src/App/App';
import { newContext } from './src/Context/context';



test('should display CourseList and welcome message after successful login and hide them after logout', async () => {
	const mockedContextUser = {
		email: '',
		password: '',
		isLooggedIn: false,
	}
  const appRef = React.createRef();

  const { container } = render(
    <newContext.Provider value={{ user: { ...mockedContextUser }, logOut: jest.fn() }}>
      <App ref={appRef} />
    </newContext.Provider>
  );

  expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });

  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, { target: { value: 'email@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  expect(submitButton).not.toBeDisabled();

  act(() => {
    fireEvent.click(submitButton);
  });

  await waitFor(() => {
    expect(screen.getByText(/course list/i)).toBeInTheDocument();
		expect(screen.getByRole('table')).toBeInTheDocument();
  });
});