// import React from 'react';
// import { fireEvent, render, waitFor } from '@testing-library/react-native';
// import SubscriptionScreen from '../src/Screen/SubscriptionScreen';
// import { Alert } from 'react-native';

// // ✅ Mock Stripe
// jest.mock('@stripe/stripe-react-native', () => ({
//   useStripe: () => ({
//     initPaymentSheet: jest.fn(() => Promise.resolve({ error: null })),
//     presentPaymentSheet: jest.fn(() => Promise.resolve({ error: null })),
//   }),
// }));

// // ✅ Mock AsyncStorage with 'user' role
// jest.mock('@react-native-async-storage/async-storage', () => ({
//   getItem: jest.fn(() =>
//     Promise.resolve(JSON.stringify({ role: 'user', email: 'test@example.com' }))
//   ),
//   setItem: jest.fn(() => Promise.resolve()),
//   removeItem: jest.fn(() => Promise.resolve()),
//   clear: jest.fn(() => Promise.resolve()),
// }));

// // ✅ Mock other dependencies
// jest.mock('react-native-linear-gradient', () => {
//   const React = require('react');
//   const { View } = require('react-native');
//   return ({ children, style }) => <View style={style}>{children}</View>;
// });

// jest.mock('../src/Component/PlanComponent', () => {
//   return () => <></>;
// });

// jest.mock('react-native-dropdown-picker', () => () => null);

// jest.mock('react-native-image-picker', () => ({
//   launchImageLibrary: jest.fn((options, callback) => {
//     callback({
//       didCancel: false,
//       assets: [
//         { uri: 'mock-uri', fileName: 'mock-image.jpg', type: 'image/jpeg' },
//       ],
//     });
//   }),
// }));

// // ✅ Spy on Alert
// jest.spyOn(Alert, 'alert');

// // ✅ Add this block to mock fetch() before each test
// beforeEach(() => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () =>
//         Promise.resolve([
//           { id: '1', name: 'Basic', price: '$9.99' },
//           { id: '2', name: 'Premium', price: '$14.99' },
//         ]),
//     })
//   );
// });

// describe('SubscriptionScreen', () => {
//   it('renders without crashing', () => {
//     const screen = render(<SubscriptionScreen />);
//     expect(screen).toBeTruthy();
//   });

//   it('displays the heading and subheading', () => {
//     const { getByText } = render(<SubscriptionScreen />);
//     expect(getByText('Choose Your Plan')).toBeTruthy();
//     expect(getByText('Unlock premium movies and shows')).toBeTruthy();
//   });

//   it('shows the "Subscribe" button', () => {
//     const { getByText } = render(<SubscriptionScreen />);
//     expect(getByText('Subscribe')).toBeTruthy();
//   });

//   it('renders all feature cards', () => {
//     const { getByText } = render(<SubscriptionScreen />);
//     expect(getByText('Multiple Devices')).toBeTruthy();
//     expect(getByText('Offline Access')).toBeTruthy();
//     expect(getByText('HD Streaming')).toBeTruthy();
//     expect(getByText('Ad-Free')).toBeTruthy();
//   });

  
// });

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SubscriptionScreen from '../src/Screen/SubscriptionScreen';


// Mock dependencies
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));
jest.mock('axios');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('react-native-linear-gradient', () => 'LinearGradient'); // Mock LinearGradient
jest.mock('@stripe/stripe-react-native', () => ({
  useStripe: jest.fn(),
}));

describe('SubscriptionScreen', () => {
  // Mock navigation
  const mockNavigate = jest.fn();
  (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockReset();
    (axios.post as jest.Mock).mockReset();
  });

  // Test Case 1: Check if the component renders correctly
  it('renders the SubscriptionScreen with heading and subheading', () => {
    const { getByText } = render(<SubscriptionScreen />);

    // Check if the heading and subheading are present
    expect(getByText('Choose Your Plan')).toBeTruthy();
    expect(getByText('Unlock premium movies and shows')).toBeTruthy();
  });

  // Test Case 2: Check if feature cards are rendered
  it('renders all feature cards with correct text', () => {
    const { getByText } = render(<SubscriptionScreen />);

    // Check if feature card texts are rendered
    expect(getByText('Multiple Devices')).toBeTruthy();
    expect(getByText('Watch on any screen')).toBeTruthy();
    expect(getByText('Offline Access')).toBeTruthy();
    expect(getByText('Download & watch later')).toBeTruthy();
    expect(getByText('HD Streaming')).toBeTruthy();
    expect(getByText('Crisp video quality')).toBeTruthy();
    expect(getByText('Ad-Free')).toBeTruthy();
    expect(getByText('No interruptions')).toBeTruthy();
  });

  // Test Case 3: Check if the Subscribe button is disabled for supervisor role
  it('disables Subscribe button when user role is supervisor', async () => {
    // Mock AsyncStorage to return user data with supervisor role
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ role: 'supervisor' })
    );

    const { getByText } = render(<SubscriptionScreen />);

    // Wait for AsyncStorage to resolve
    await waitFor(() => {
      const subscribeButton = getByText('Subscribe');
      expect(subscribeButton).toBeTruthy();
      expect(subscribeButton).toBeDisabled(); // Check if button is disabled
    });
  });

  // Test Case 4: Check if the Subscribe button is enabled for non-supervisor role
  it('enables Subscribe button when user role is not supervisor', async () => {
    // Mock AsyncStorage to return user data with non-supervisor role
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ role: 'user' })
    );

    const { getByText } = render(<SubscriptionScreen />);

    // Wait for AsyncStorage to resolve
    await waitFor(() => {
      const subscribeButton = getByText('Subscribe');
      expect(subscribeButton).toBeTruthy();
      expect(subscribeButton).not.toBeDisabled(); // Check if button is enabled
    });
  });

  // Test Case 5: Test the checkout function on Subscribe button press
  it('calls checkout function and navigates to WebView on Subscribe button press', async () => {
    // Mock AsyncStorage to return a token and user data
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce(JSON.stringify({ role: 'user' })) // userData
      .mockResolvedValueOnce('mock-token'); // token

    // Mock axios response
    (axios.post as jest.Mock).mockResolvedValue({
      data: { url: 'https://example.com/checkout' },
    });

    const { getByText } = render(<SubscriptionScreen />);

    // Wait for AsyncStorage to resolve
    await waitFor(() => {
      const subscribeButton = getByText('Subscribe');
      fireEvent.press(subscribeButton); // Simulate button press
    });

    // Check if axios was called with correct parameters
    expect(axios.post).toHaveBeenCalledWith(
      'https://movie-ror-priyanshu-singh.onrender.com/api/v1/subscriptions?plan_type=premium',
      {},
      {
        headers: { Authorization: 'Bearer mock-token' },
      }
    );

    // Check if navigation was called with correct parameters
    expect(mockNavigate).toHaveBeenCalledWith('WebView', {
      url: 'https://example.com/checkout',
    });
  });

  // Test Case 6: Handle error in checkout function
  it('logs error when checkout fails', async () => {
    // Mock console.log to track error logging
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    // Mock AsyncStorage to return a token and user data
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce(JSON.stringify({ role: 'user' })) // userData
      .mockResolvedValueOnce('mock-token'); // token

    // Mock axios to throw an error
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: 'Error occurred' },
    });

    const { getByText } = render(<SubscriptionScreen />);

    // Wait for AsyncStorage to resolve
    await waitFor(() => {
      const subscribeButton = getByText('Subscribe');
      fireEvent.press(subscribeButton); // Simulate button press
    });

    // Check if error was logged
    expect(consoleLogSpy).toHaveBeenCalledWith({ data: 'Error occurred' });

    // Clean up spy
    consoleLogSpy.mockRestore();
  });
});