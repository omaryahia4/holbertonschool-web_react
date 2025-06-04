import { getFooterCopy } from '../../utils/utils';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer/Footer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('Footer Component', () => {
  let store;

  test('renders correct copyright string when getFooterCopy returns true', () => {
    expect(getFooterCopy(true)).toBe('Holberton School');
  });

  test('does not display "Contact us" link when the user is logged out', () => {
    // Mock store with isLoggedIn: false
    store = mockStore({
      auth: {
        isLoggedIn: false,
      },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    const contactLink = screen.queryByText('Contact us');
    expect(contactLink).toBeNull();
  });

  test('displays "Contact us" link when the user is logged in', () => {
    // Mock store with isLoggedIn: true
    store = mockStore({
      auth: {
        isLoggedIn: true,
      },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    const contactLink = screen.getByText('Contact us');
    expect(contactLink).toBeInTheDocument();
  });
});
