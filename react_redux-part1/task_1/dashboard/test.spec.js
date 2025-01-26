import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import App from './src/App';
import { getLatestNotification } from './src/utils/utils';

jest.mock('axios', () => require('jest-mock-axios').default);

const originalError = console.error;
const originalWarn = console.warn;

let consoleOutput = [];

console.error = (...args) => {
  consoleOutput.push(['error', args[0]]);
};

console.warn = (...args) => {
  consoleOutput.push(['warn', args[0]]);
};

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

beforeEach(() => {
  consoleOutput = [];
  mockAxios.reset();
});

afterEach(() => {
  jest.clearAllMocks();
  console.log('CONSOLE', consoleOutput);
  if (consoleOutput.length > 0) {
    throw new Error(
      'Test failed: Console warnings or errors detected:\n' +
      consoleOutput.map(([type, message]) => `${type}: ${message}`).join('\n')
    );
  }
});

describe('App Component default behavior', () => {
  const mockNotificationsResponse = {
    data: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
      ]
    }
  };

  test('should display CourseList and welcome message after login and hide them after logout', async () => {
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockNotificationsResponse));

    await act(async () => {
      render(<App />);
    });

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

    const logoutLink = screen.getByText(/(logout)/i);
    await act(async () => {
      await userEvent.click(logoutLink);
    });

    await waitFor(() => {
      expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
      expect(screen.queryByText(/course list/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
    });
  });
});