import { render, screen } from '@testing-library/react';
import Footer from './src/Footer/Footer';
import { getCurrentYear, getFooterCopy } from './src/utils/utils';
import newContextDefault, * as newContextNamedExports from './src/Context/context';
const newContext = newContextNamedExports.newContext || newContextDefault;
import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});


describe('', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateLogin = (email, password) => {
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = password.length >= 8;
    return isValidEmail && isValidPassword;
  };

  const mockLogout = jest.fn()

  test('the link should not exists once a user is logged out', () => {
    const mockUserContext = {
      email: '',
      password: '',
      isLoggedIn: validateLogin('', '')
    }
    
    render(
      <newContext.Provider value={{ user: mockUserContext, logOut: mockLogout }}>
        <Footer />
      </newContext.Provider>
    );
  
    const link = screen.queryByRole('link', { name: /contact us/i });
    const currentYear = getCurrentYear();
    const footerParagraph = screen.getByText(`Copyright ${currentYear} - ${getFooterCopy(true)}`);

    expect(footerParagraph).toHaveTextContent(new RegExp(`Copyright ${currentYear} - Holberton School`, 'i'));

    expect(link).not.toBeInTheDocument()
  });
  
  test('the link should not exist when the user email is null', () => {
    const mockUserContext = {
      email: null,
      password: 'password123',
      isLoggedIn: validateLogin(null, 'password123')
    };
    
    render(
      <newContext.Provider value={{ user: mockUserContext, logOut: mockLogout }}>
        <Footer />
      </newContext.Provider>
    );
  
    const link = screen.queryByRole('link', { name: /contact us/i });
    const currentYear = getCurrentYear();
    const footerParagraph = screen.getByText(`Copyright ${currentYear} - ${getFooterCopy(true)}`);

    expect(footerParagraph).toHaveTextContent(new RegExp(`Copyright ${currentYear} - Holberton School`, 'i'));

    expect(link).not.toBeInTheDocument();
  });

  test('the link should not exist when the user provides an invalid email', () => {
    const mockUserContext = {
      email: 'invalid-email',
      password: 'password123',
      isLoggedIn: validateLogin('invalid-email', 'password123')
    };
    
    render(
      <newContext.Provider value={{ user: mockUserContext, logOut: mockLogout }}>
        <Footer />
      </newContext.Provider>
    );

    const link = screen.queryByRole('link', { name: /contact us/i });
    const currentYear = getCurrentYear();
    const footerParagraph = screen.getByText(`Copyright ${currentYear} - ${getFooterCopy(true)}`);

    expect(footerParagraph).toHaveTextContent(new RegExp(`Copyright ${currentYear} - Holberton School`, 'i'));

    expect(link).not.toBeInTheDocument();
  });

  test('the link should not exist when the user is logged out despite valid credentials', () => {
    const mockUserContext = {
      email: 'test@example.com',
      password: 'password123',
      isLoggedIn: false
    };
    
    render(
      <newContext.Provider value={{ user: mockUserContext, logOut: mockLogout }}>
        <Footer />
      </newContext.Provider>
    );

    const link = screen.queryByRole('link', { name: /contact us/i });
    const currentYear = getCurrentYear();
    const footerParagraph = screen.getByText(`Copyright ${currentYear} - ${getFooterCopy(true)}`);
    expect(footerParagraph).toHaveTextContent(new RegExp(`Copyright ${currentYear} - Holberton School`, 'i'));
    expect(link).not.toBeInTheDocument();
  });

  test('the link should exist when the user is logged in but logOut is null', () => {
    const mockUserContext = {
      email: 'test@example.com',
      password: 'password123', 
      isLoggedIn: validateLogin('test@example.com', 'password123')
    };
    
    render(
      <newContext.Provider value={{ user: mockUserContext, logOut: null }}>
        <Footer />
      </newContext.Provider>
    );

    const link = screen.queryByRole('link', { name: /contact us/i });
    const currentYear = getCurrentYear();
    const footerParagraph = screen.getByText(`Copyright ${currentYear} - ${getFooterCopy(true)}`);

    expect(footerParagraph).toHaveTextContent(new RegExp(`Copyright ${currentYear} - Holberton School`, 'i'));
    expect(link).toBeInTheDocument();
  });
});