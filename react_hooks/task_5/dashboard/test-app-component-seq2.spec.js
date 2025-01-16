import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { newContext } from './src/Context/context';
import App from "./src/App/App";


test('should render login page when the user is not logged in and handle login flow correctly', async () => {
	const user = userEvent.setup()

	const mockedContextUser = {
		email: '',
		password: '',
		isLoggedIn: false,
	};

	const { container } = render(
		<newContext.Provider value={{ user: { ...mockedContextUser }, logOut: jest.fn() }}>
			<App />
		</newContext.Provider>
	);

	expect(screen.getByText('Log in to continue')).toBeInTheDocument();

	const emailInput = screen.getByLabelText(/email/i);
	const passwordInput = screen.getByLabelText(/password/i);
	const submitButton = screen.getByRole('button', { name: /ok/i });

	await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'password123');
  await user.click(submitButton);

	expect(screen.getByText(/course list/i)).toBeInTheDocument();
	expect(screen.getByRole('table')).toBeInTheDocument();

	const logoutSection = container.querySelector('div#logoutSection');
	expect(within(logoutSection).getByText('test@example.com')).toBeInTheDocument();
	expect(within(logoutSection).getByText(/logout/i)).toBeInTheDocument();

	const logoutButton = within(logoutSection).getByText(/logout/i);

	await act(async () => {
		await user.click(logoutButton);
	});

	expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
});