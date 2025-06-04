import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './src/components/Header/Header';
import authReducer, { logout } from './src/features/auth/authSlice';
const {StyleSheetTestUtils} = require("aphrodite");

const createMockStore = (preloadedState) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: preloadedState,
    },
  });
};

describe('Header Component', () => {
  const mockAuthState = {
    isLoggedIn: false,
    user: {},
  };

  test('renders the logo and heading', () => {
    const store = createMockStore(mockAuthState);
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
    expect(screen.getByText(/school Dashboard/i)).toBeInTheDocument();
  });

  test('does not render the logout section when user is not logged in', () => {
    const store = createMockStore(mockAuthState);
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
  });

  test('renders the logout section with the correct email when user is logged in', () => {
    const store = createMockStore({
      isLoggedIn: true,
      user: { email: 'test@example.com' },
    });
    const { container } = render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const logoutSection = container.querySelector('#logoutSection');
    expect(logoutSection).toBeInTheDocument();

    const welcomeText = screen.getByText(/Welcome/);
    expect(logoutSection).toContainElement(welcomeText);

    const emailElement = screen.getByText('test@example.com');
    expect(logoutSection).toContainElement(emailElement);
  });

  test('dispatches the logout action when logout link is clicked', () => {
    const store = createMockStore({
      isLoggedIn: true,
      user: { email: 'test@example.com' },
    });

    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    fireEvent.click(screen.getByRole('link', { name: /logout/i}));

    expect(dispatchSpy).toHaveBeenCalledWith(logout());

    dispatchSpy.mockRestore();
  });

  test('fails if the email property is missing from the user object', () => {
    const store = createMockStore({
      isLoggedIn: true,
      user: { password: '12345678' },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
  });
});
StyleSheetTestUtils.suppressStyleInjection();