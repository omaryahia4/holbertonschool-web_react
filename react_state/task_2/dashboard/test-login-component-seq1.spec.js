import { fireEvent, render, screen } from '@testing-library/react';
import Login from './src/Login/Login';


describe('Login Component Tests', () => {

	test('should initialize with default email and password', () => {
	  render(<Login />);
	  const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
	  
	  expect(emailInput.value).toBe('');
	  expect(passwordInput.value).toBe('');
	});

	test('should call logIn function on form submission', () => {
	  const mockLogin = jest.fn();
	  render(<Login login={mockLogin} email="test@test.com" password="password123" />);
  
	  const form = screen.getByRole('form');
	  fireEvent.submit(form);
  
	  expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password123');
	});

	test('should update state on email and password input change', () => {
	  render(<Login />);
	  
	  const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
  
	  fireEvent.change(emailInput, { target: { value: 'newemail@test.com' } });
	  fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
  
	  expect(emailInput.value).toBe('newemail@test.com');
	  expect(passwordInput.value).toBe('newpassword');
	});
  
	test('should enable the submit button only with valid email and password', () => {
	  render(<Login />);
	  
	  const emailInput = screen.getByLabelText(/email/i);
		const passwordInput = screen.getByLabelText(/password/i);
		const submitButton = screen.getByRole('button', { name: /ok/i });
	  
	  expect(submitButton).toBeDisabled();
  
	  fireEvent.change(emailInput, { target: { value: 'valid@test.com' } });
	  fireEvent.change(passwordInput, { target: { value: 'validpassword' } });
  
	  expect(submitButton).not.toBeDisabled();
	});
});