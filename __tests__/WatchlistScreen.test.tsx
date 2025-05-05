import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WachListScreen from '../src/Screen/WachListScreen';

jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return ({ children, style }) => <View style={style}>{children}</View>;
});

jest.mock('../src/Component/WacthListMovieCom', () => {
  return () => <></>;
});

describe('WachListScreen', () => {


  it('renders heading text', () => {
    const { getByText } = render(<WachListScreen />);
    expect(getByText('My WatchList')).toBeTruthy();
  });

  it('renders both tab buttons', () => {
    const { getByText } = render(<WachListScreen />);
    expect(getByText('Want to Watch')).toBeTruthy();
    expect(getByText('Watched')).toBeTruthy();
  });

  

   
  
});
