import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { newContext } from './src/Context/context';
import App from './src/App/App';

describe('App Component State Management', () => {
  const renderAppWithContext = (initialContextValue = {}) => {
    const defaultContext = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false
      },
      logOut: jest.fn()
    };

    return render(
      <newContext.Provider value={{ ...defaultContext, ...initialContextValue }}>
        <App />
      </newContext.Provider>
    );
  };

	describe('DisplayDrawer State Tests', () => {
		test('displayDrawer state management and notification visibility', async () => {
			const user = userEvent.setup();
			renderAppWithContext();

			const notificationsList = screen.getByText(/here is the list of notifications/i);
			expect(notificationsList).toBeVisible();

			const closeButton = screen.getByRole('button', { name: /close/i });
			await user.click(closeButton);

			await waitFor(() => {
				const hiddenList = screen.queryByText(/here is the list of notifications/i);
				expect(hiddenList).toBeNull();
			});

			const notificationTitle = screen.getByText(/your notifications/i);
			await user.click(notificationTitle);

			await waitFor(() => {
				const visibleList = screen.getByText(/here is the list of notifications/i);
				expect(visibleList).toBeVisible();
			});
		});

		test('displayDrawer keyboard interactions', async () => {
			const user = userEvent.setup();
			renderAppWithContext();

			const notificationsList = screen.getByText(/here is the list of notifications/i);
			expect(notificationsList).toBeVisible();

			const closeButton = screen.getByRole('button', { name: /close/i });
			await user.click(closeButton);

			await waitFor(() => {
				const hiddenList = screen.queryByText(/here is the list of notifications/i);
				expect(hiddenList).toBeNull();
			}, { timeout: 2000 });
		});

		test('Should remove notification items once click on it', async () => {
			const user = userEvent.setup();
			renderAppWithContext();

			const initialListItems = screen.getAllByRole('listitem');
      expect(initialListItems).toHaveLength(3);

      await user.click(initialListItems[0]);

      await waitFor(() => {
        const updatedListItems = screen.getAllByRole('listitem');
        expect(updatedListItems).toHaveLength(2);
        expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();
      });
		});
	});
});