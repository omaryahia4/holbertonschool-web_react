import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import { newContext } from './src/Context/context';
import App from "./src/App/App";
import { getLatestNotification } from './src/utils/utils';

jest.mock('axios', () => require('jest-mock-axios').default);

describe('App Component Tests', () => {
  const mockNotificationsResponse = {
    data: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
      ]
    }
  };

  // clean up state after each test
  afterEach(() => {
    mockAxios.reset();
  });

  test('verify notification item deletion', async () => {
    const user = userEvent.setup();
		const mockedContextUser = {
			email: '',
			password: '',
			isLoggedIn: false,
		};
    
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockNotificationsResponse));
    
    render(
			<newContext.Provider value={{ user: { ...mockedContextUser }, logOut: jest.fn() }}>
				<App />
			</newContext.Provider>
		);

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });

    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element.textContent === 'Urgent requirement - complete by EOD';
    })).toBeInTheDocument();

    await user.click(screen.getByText('New course available'));
    
    await waitFor(() => {
      expect(screen.queryByText('New course available')).not.toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');
  });
});