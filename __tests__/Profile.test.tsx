import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen from '../src/Screen/ProfileScreen';

describe('ProfileScreen', () => {
  it('renders the main container', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('MainView')).toBeTruthy();
  });

 

  it('displays the user image', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('UserImage')).toBeTruthy();
  });

  it('displays the username and email', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('Username').props.children).toBe(' Sharan ');
    expect(getByTestId('Usermail').props.children).toBe('Sharan@magicedtech.com');
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