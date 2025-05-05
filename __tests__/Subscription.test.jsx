import React from 'react';
import { render } from '@testing-library/react-native';
import SubscriptionScreen from '../src/Screen/SubscriptionScreen';

// Mock LinearGradient to avoid native rendering issues
jest.mock('react-native-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return ({ children, style }) => <View style={style}>{children}</View>;
});

// Mock PlanComponent to simplify the test
jest.mock('../src/Component/PlanComponent', () => {
  return () => <></>;
});

describe('SubscriptionScreen', () => {
  it('renders without crashing', () => {
    const screen = render(<SubscriptionScreen />);
    expect(screen).toBeTruthy();
  });

  it('displays the heading and subheading', () => {
    const { getByText } = render(<SubscriptionScreen />);
    expect(getByText('Choose Your Plan')).toBeTruthy();
    expect(getByText('Unlock premium movie and shows')).toBeTruthy();
  });

  it('shows the "Start free trial" button', () => {
    const { getByText } = render(<SubscriptionScreen />);
    expect(getByText('Start free trial')).toBeTruthy();
  });

  it('renders multiple feature boxes', () => {
    const { getAllByText } = render(<SubscriptionScreen />);
    // All boxes have the same repeated text
    const boxes = getAllByText('Multiple Devices');
    expect(boxes.length).toBeGreaterThanOrEqual(4);
  });
});