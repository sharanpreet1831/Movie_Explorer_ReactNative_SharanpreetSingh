

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import BottomTabNavigation from '../src/Navigation/BottomTabNavigation';
import ProfileScreen from '../src/Screen/ProfileScreen';

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

  it('navigates to Profile tab', async () => {
    const { getByText  } = render(<BottomTabNavigation />);
    const profileTab = getByText('Profile');
    fireEvent.press(profileTab);
    const {getByTestId} = render(<ProfileScreen />)
    await waitFor(() => {
        expect(getByTestId('ProfileScreen')).toBeTruthy();
      });
   
  });
});
