import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SignupForm from '../../Components/Layouts/Auth/SignupForm';
import { signupUser } from '../../Utils/Api';
jest.mock('react-toastify', () => ({
  ToastContainer: () => null,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../Utils/Api', () => ({
  signupUser: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SignupForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders signup form with all input fields and button', () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Enter Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
  });

  test('displays validation errors for empty form submission', async () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required.')).toBeInTheDocument();
      expect(screen.getByText('Email is required.')).toBeInTheDocument();
      expect(screen.getByText('Password is required.')).toBeInTheDocument();
      expect(screen.getByText('Confirm password is required.')).toBeInTheDocument();
    });
  });

  test('displays validation error for invalid email', async () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText('Enter Your Email'), 'invalid-email');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument();
    });
  });

  test('displays validation errors for invalid password', async () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Enter Password');

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'short');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument();
    });

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'noNumberSpecial');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() => {
      expect(screen.getByText('Password must contain at least one number.')).toBeInTheDocument();
    });

    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'noSpecial123');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() => {
      expect(screen.getByText('Password must contain at least one special character.')).toBeInTheDocument();
    });
  });

  test('displays validation error for mismatched passwords', async () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText('Enter Password'), 'Password123!');
    await userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'Different123!');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    });
  });

  test('handles successful signup with API call and navigation', async () => {
    (signupUser as jest.Mock).mockResolvedValueOnce({ data: 'success' });

    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText('Enter Your Name'), 'Sandy');
    await userEvent.type(screen.getByPlaceholderText('Enter Your Email'), 'sandy@example.com');
    await userEvent.type(screen.getByPlaceholderText('Enter Password'), 'Password123!');
    await userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'Password123!');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => {
      expect(signupUser).toHaveBeenCalledWith({
        name: 'Sandy',
        email: 'sandy@example.com',
        password: 'Password123!',
      });
      expect(require('react-toastify').toast.success).toHaveBeenCalledWith('Signup successful!');
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('handles API error during signup', async () => {
    const errorResponse = {
      response: {
        data: {
          errors: [
            'Email has already been taken',
            { email: 'Email already exists.' },
          ],
        },
      },
    };
    (signupUser as jest.Mock).mockRejectedValueOnce(errorResponse);

    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByPlaceholderText('Enter Your Name'), 'John Doe');
    await userEvent.type(screen.getByPlaceholderText('Enter Your Email'), 'john@example.com');
    await userEvent.type(screen.getByPlaceholderText('Enter Password'), 'Password123!');
    await userEvent.type(screen.getByPlaceholderText('Confirm Password'), 'Password123!');
    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));
    await waitFor(() => {
      expect(screen.getByText('Email has already been taken')).toBeInTheDocument();
    });
  });

  test('navigates to login page when clicking login link', async () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByText('Login'));

    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

});
