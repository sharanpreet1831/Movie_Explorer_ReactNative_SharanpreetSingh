import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login_SignUp from '../src/Screen/Login_SignUp';


const mockNavigate = jest.fn();
const mockHandleLogin = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});


jest.mock('../src/Screen/Login_SignUp', () => {
  const originalModule = jest.requireActual('../src/Screen/Login_SignUp');
  return {
    __esModule: true,
    ...originalModule,
    handleLogin: jest.fn(() => mockHandleLogin()),
  };
});

describe('LoginScreen', () => {
  it('renders correctly', () => {
    const { getByTestId, getByText } = render(<Login_SignUp />);

    expect(getByTestId('LoginScreen')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('sign-in-button')).toBeTruthy();
    expect(getByTestId('google-signin-button')).toBeTruthy();
    expect(getByTestId('signup-button')).toBeTruthy();
    expect(getByText('MovieVerse')).toBeTruthy();
  });

  it('allows user to type in email and password', () => {
    const { getByTestId } = render(<Login_SignUp />);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  
});