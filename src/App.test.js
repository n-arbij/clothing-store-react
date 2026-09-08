import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => localStorage.clear());

test('renders the shared customer login form', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /sign in to your account/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
});

test('switches to registration and creates an account', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /create an account/i }));
  fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Ada Admin' } });
  fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'ada@example.com' } });
  fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
  expect(screen.getByText(/customer workspace/i)).toBeInTheDocument();
  expect(screen.getByText(/welcome back, ada/i)).toBeInTheDocument();
});
