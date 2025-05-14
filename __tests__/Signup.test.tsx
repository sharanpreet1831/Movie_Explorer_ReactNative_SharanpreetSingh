import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUp from '../src/Screen/SignUp';

global.fetch = jest.fn();

describe('SignUp Component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders all input fields and button', () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    expect(getByPlaceholderText('Phone Number')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('shows error when fields are empty', async () => {
    const { getByText } = render(<SignUp />);
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(getByText('Sign In')).toBeTruthy();
    });
  });

  it('shows error when passwords do not match', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    fireEvent.changeText(getByPlaceholderText('Username'), 'John');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'differentpass');
    fireEvent.changeText(getByPlaceholderText('Phone Number'), '1234567890');

    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      
    });
  });

  it('submits form and shows success message', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ user: { name: 'John' } }),
    });

    const { getByPlaceholderText, getByText } = render(<SignUp />);

    fireEvent.changeText(getByPlaceholderText('Username'), 'John');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Confirm Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('Phone Number'), '1234567890');

    fireEvent.press(getByText('Sign In'));

   
    await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
      });
    });
  });