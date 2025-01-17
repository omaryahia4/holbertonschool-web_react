import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './src/Login/Login';

jest.mock('./src/HOC/WithLogging', () => ({
	__esModule: true,
	default: (Component) => Component,
}));

describe('Login component tests', () => {
  let loginMock;

  beforeEach(() => {
    loginMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

	describe('Form Elements', () => {
    test('testing signin form elements', () => {
      render(<Login {...loginMock}/>);
    
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
    });
    
    test('it should check that the email input element will be focused whenever the associated label is clicked', async () => {
      render(<Login {...loginMock}/>)
    
      const emailInput = screen.getByLabelText('Email');
      const emailLabel = screen.getByText('Email');
    
      userEvent.click(emailLabel);
    
      await waitFor(() => {
        expect(emailInput).toHaveFocus();
      });
    })
    
    test('it should check that the password input element will be focused whenver the associated label is clicked', async () => {
      render(<Login {...loginMock}/>)
    
      const passwordLabel = screen.getByText('Password');
      const passwordInput = screen.getByLabelText('Password');
    
      userEvent.click(passwordLabel);
    
      await waitFor(() => {
        expect(passwordInput).toHaveFocus();
      });
    });
    
    test('submit button behavior with different input combinations', () => {
      const props = {
        login: loginMock,
        isLoggedIn: false
      };
  
      render(<Login {...props} />);
      
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByText('OK');

      expect(submitButton).toBeDisabled();
      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: '123' } });
      expect(submitButton).toBeDisabled();
    
      fireEvent.change(emailInput, { target: { value: 'test.com' } });
      fireEvent.change(passwordInput, { target: { value: '12345678' } });
      expect(submitButton).toBeDisabled();

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: '12345678' } });
      expect(submitButton).not.toBeDisabled();
    });

    test('should call logIn function on form submission with correct values', () => {
      render(<Login login={loginMock} />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const form = screen.getByRole('form');
      
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.submit(form);
    
      expect(loginMock).toHaveBeenCalledWith('test@test.com', 'password123');
    });
  });
});