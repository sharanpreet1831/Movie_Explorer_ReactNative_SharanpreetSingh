import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import StackNavigation from '../src/navigation/StackNavigation';
import SignUp from '../src/Screen/SignUp';



jest.mock('@react-native-async-storage/async-storage', ()=> ({
  setItem: jest.fn(() => Promise.resolve()),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-dropdown-picker', () => {
  return jest.fn().mockImplementation(() => null);
});

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn((options, callback) => {
    callback({
      didCancel: false,
      assets: [
        {
          uri: 'mock-uri',
          fileName: 'mock-image.jpg',
          type: 'image/jpeg',
        },
      ],
    });
  }),
}));


jest.mock('@stripe/stripe-react-native', () => ({
  useStripe: () => ({
    initPaymentSheet: jest.fn(() => Promise.resolve({ error: null })),
    presentPaymentSheet: jest.fn(() => Promise.resolve({ error: null })),
  }),
}));



describe('Stack Navigation', () => {
    // it('navigates to SignUp screen on SignUp button press', async () => {
    //   const { getByText } = render(<StackNavigation />);
  
    //   // Simulate press on SignUp button/text
    //   const signUpButton = await waitFor(() => getByText('SignUp'));
    //   fireEvent.press(signUpButton);
  
    //   // Wait for SignUp screen to appear
    //   const { getByTestId } = render(<SignUp/>)
    //   await waitFor(() => {
    //     expect(getByTestId('SignUpScreen')).toBeTruthy();
    //   });
    // });
    it('navigates to SignUp screen on SignUp button press', async () => {
        const { getByText, getByTestId } = render(<StackNavigation />);
    
        const signUpButton = await waitFor(() => getByText('Sign up'));
        fireEvent.press(signUpButton);
    
        await waitFor(() => {
          expect(getByTestId('SignUpScreen')).toBeTruthy();
        });
      });
  });


//   it('navigates to Profile tab', async () => {
//     const { getByText  } = render(<BottomTabNavigation />);
//     const profileTab = getByText('Profile');
//     fireEvent.press(profileTab);
//     const {getByTestId} = render(<ProfileScreen />)
//     await waitFor(() => {
//         expect(getByTestId('ProfileScreen')).toBeTruthy();
//       });
   
//   });