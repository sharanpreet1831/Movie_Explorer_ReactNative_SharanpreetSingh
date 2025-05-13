

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import BottomTabNavigation from '../src/Navigation/BottomTabNavigation';
import ProfileScreen from '../src/Screen/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';



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
  
describe('BottomTabNavigation', () => {
//   it('renders default screen (Home)', async () => {
//     const { getByText } = render(<BottomTabNavigation />);
//     expect(getByText('Home Screen')).toBeTruthy();
//   });

//   it('navigates to Explorer tab', async () => {
//     const { getByText, getAllByText } = render(<BottomTabNavigation />);
//     const explorerTab = getByText('Explorer');
//     fireEvent.press(explorerTab);
//     expect(getByText('Explorer Screen')).toBeTruthy();
//   });

//   it('navigates to Subscription tab', async () => {
//     const { getByText } = render(<BottomTabNavigation />);
//     const subscriptionTab = getByText('Subscription');
//     fireEvent.press(subscriptionTab);
//     expect(getByText('Subscription Screen')).toBeTruthy();
//   });

//   it('navigates to WatchList tab', async () => {
//     const { getByText } = render(<BottomTabNavigation />);
//     const watchListTab = getByText('WatchList');
//     fireEvent.press(watchListTab);
//     expect(getByText('WatchList Screen')).toBeTruthy();
//   });

  // it('navigates to Profile tab', async () => {
  //   const { getByText  } = render(<BottomTabNavigation />);
  //   const profileTab = getByText('Profile');
  //   fireEvent.press(profileTab);
  //   const {getByTestId} = render(<ProfileScreen />)
  //   await waitFor(() => {
  //       expect(getByTestId('ProfileScreen')).toBeTruthy();
  //     });
   
  // });
  it('navigates to Profile tab', async () => {
    const { getByText, getByTestId } = render(
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    );

    const profileTab = getByText('Profile');
    fireEvent.press(profileTab);

    // Wait for the Profile screen to render
    await waitFor(() => {
      expect(getByTestId('ProfileScreen')).toBeTruthy();
    });
  });
});
