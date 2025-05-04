
import React from "react" ;
import {render} from '@testing-library/react-native'
import Login_SignUp from "../src/Screen/Login_SignUp";

describe("login screen " , () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<Login_SignUp />);
        const loginScreen = getByTestId('LoginScreen');
        expect(loginScreen).toBeTruthy();
    });
    it('displays the main heading', () => {
        const { getByText } = render(<Login_SignUp />);
        const mainHeading = getByText('MovieVerse');
        expect(mainHeading).toBeTruthy();
    });
    it('displays the email or username input field', () => {
        const { getByPlaceholderText } = render(<Login_SignUp />);
        const emailInput = getByPlaceholderText('Email or Username');
        expect(emailInput).toBeTruthy();
    });

    it('displays the password input field', () => {
        const { getByPlaceholderText } = render(<Login_SignUp />);
        const passwordInput = getByPlaceholderText('Passwords');
        expect(passwordInput).toBeTruthy();
    });

    it('displays the sign-in button', () => {
        const { getByText } = render(<Login_SignUp />);
        const signInButton = getByText('Sign In');
        expect(signInButton).toBeTruthy();
    });

    it('displays the OR separator', () => {
        const { getByText } = render(<Login_SignUp />);
        const orText = getByText('OR');
        expect(orText).toBeTruthy();
    });
    it('displays the sign-in with Google button', () => {
        const { getByText } = render(<Login_SignUp />);
        const googleButton = getByText('Sign in with Google');
        expect(googleButton).toBeTruthy();
    });

})