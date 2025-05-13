import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../src/Screen/ProfileScreen';


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


const renderWithNavigation = () =>
  render(
    <NavigationContainer>
      <ProfileScreen />
    </NavigationContainer>
  );

describe('ProfileScreen', () => {
  it('renders the main container', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('ProfileScreen')).toBeTruthy();
  });

 

  it('displays the user image', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('UserImage')).toBeTruthy();
  });

  it('displays the username and email', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('Username')).toBeTruthy();
    expect(getByTestId('Usermail')).toBeTruthy();
  });

  it('renders Account Setting option', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('AccountSetting')).toBeTruthy();
  });

  it('renders Notification option', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('Notification')).toBeTruthy();
  });

  it('renders Help option', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('Help')).toBeTruthy();
  });

  it('renders Logout option', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('Logout')).toBeTruthy();
  });
});