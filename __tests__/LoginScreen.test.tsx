


import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Login_SignUp from '../src/Screen/Login_SignUp';

jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    reset: jest.fn(),
  }),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

global.fetch = jest.fn();


const mockNavigate = jest.fn();
const mockReset = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    reset: mockReset,
  }),
}));

describe('Login_SignUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          user: { id: 1, email: 'a@gmail.com' },
          auth_info: { access_token: { token: 'mock-token' } },
        }),
    });
    jest.spyOn(Alert, 'alert');
  });

  it('renders Login_SignUp correctly', () => {
    const { getByTestId, getByText } = render(<Login_SignUp />);
    expect(getByTestId('LoginScreen')).toBeTruthy();
    expect(getByTestId('MovieVerse')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('sign-in-button')).toBeTruthy();
    expect(getByTestId('google-signin-button')).toBeTruthy();
    expect(getByText('Sign up')).toBeTruthy();
  });

  it('updates email and password inputs', () => {
    const { getByTestId } = render(<Login_SignUp />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    fireEvent.changeText(emailInput, 'test@gmail.com');
    fireEvent.changeText(passwordInput, 'test123');
    expect(emailInput.props.value).toBe('test@gmail.com');
    expect(passwordInput.props.value).toBe('test123');
  });

 

  it('shows alert on empty fields', () => {
    const { getByTestId } = render(<Login_SignUp />);
    const emailInput = getByTestId('email-input');
    const signInButton = getByTestId('sign-in-button');
    fireEvent.changeText(emailInput, '');
    fireEvent.press(signInButton);
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'Please fill in all fields');
  });

  it('handles successful login', async () => {
    const { getByTestId } = render(<Login_SignUp />);
    const signInButton = getByTestId('sign-in-button');
    fireEvent.press(signInButton);
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://movie-ror-priyanshu-singh.onrender.com/api/v1/login',
        expect.any(Object)
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'userData',
        JSON.stringify({ id: 1, email: 'a@gmail.com' })
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'mock-token');
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'Logged in successfully');
    });
  });

  it('handles login failure', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Invalid credentials' }),
    });
    const { getByTestId } = render(<Login_SignUp />);
    const signInButton = getByTestId('sign-in-button');
    fireEvent.press(signInButton);
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Login Failed', 'Invalid credentials');
    });
  });

  it('handles network error', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    const { getByTestId } = render(<Login_SignUp />);
    const signInButton = getByTestId('sign-in-button');
    fireEvent.press(signInButton);
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Network Error',
        'Something went wrong. Please try again.'
      );
    });
  });

  // it('navigates to SignUp screen', () => {
  //   const { getByTestId } = render(<Login_SignUp />);
  //   const signUpButton = getByTestId('signup-button');
  //   fireEvent.press(signUpButton);
  //   expect(useNavigation().navigate).toHaveBeenCalledWith('SignUp');
  // });

  // it('displays loading indicator during login', async () => {
  //   const { getByTestId } = render(<Login_SignUp />);
  //   const signInButton = getByTestId('sign-in-button');
  //   fireEvent.press(signInButton);
  //   expect(getByTestId('ActivityIndicator')).toBeTruthy();
  //   await waitFor(() => {
  //     expect(getByTestId('ActivityIndicator')).toBeNull();
  //   });
  // });
});