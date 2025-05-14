

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import SubscriptionScreen from '../src/Screen/SubscriptionScreen';


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

  const mockNavigate = jest.fn();
  (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });


  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockReset();
    (axios.post as jest.Mock).mockReset();
  });


  it('renders the SubscriptionScreen with heading and subheading', () => {
    const { getByText } = render(<SubscriptionScreen />);

    expect(getByText('Choose Your Plan')).toBeTruthy();
    expect(getByText('Unlock premium movies and shows')).toBeTruthy();
  });


  it('renders all feature cards with correct text', () => {
    const { getByText } = render(<SubscriptionScreen />);

    expect(getByText('Multiple Devices')).toBeTruthy();
    expect(getByText('Watch on any screen')).toBeTruthy();
    expect(getByText('Offline Access')).toBeTruthy();
    expect(getByText('Download & watch later')).toBeTruthy();
    expect(getByText('HD Streaming')).toBeTruthy();
    expect(getByText('Crisp video quality')).toBeTruthy();
    expect(getByText('Ad-Free')).toBeTruthy();
    expect(getByText('No interruptions')).toBeTruthy();
  });

  it('disables Subscribe button when user role is supervisor', async () => {
  
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ role: 'supervisor' })
    );

    const { getByText } = render(<SubscriptionScreen />);

   
    await waitFor(() => {
      const subscribeButton = getByText('Subscribe');
      expect(subscribeButton).toBeTruthy();
      expect(subscribeButton).toBeDisabled(); 
    });
  });


  it('enables Subscribe button when user role is not supervisor', async () => {
    
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ role: 'user' })
    );

    const { getByText } = render(<SubscriptionScreen />);

    
    await waitFor(() => {
      const subscribeButton = getByText('Subscribe');
      expect(subscribeButton).toBeTruthy();
      expect(subscribeButton).not.toBeDisabled(); 
    });
  });

  
  it('calls checkout function and navigates to WebView on Subscribe button press', async () => {
   
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce(JSON.stringify({ role: 'user' })) // userData
      .mockResolvedValueOnce('mock-token'); // token

   
    (axios.post as jest.Mock).mockResolvedValue({
      data: { url: 'https://example.com/checkout' },
    });

    const { getByText } = render(<SubscriptionScreen />);

    
    await waitFor(() => {
      const subscribeButton = getByText('Subscribe');
      fireEvent.press(subscribeButton);
    });

    
    expect(axios.post).toHaveBeenCalledWith(
      'https://movie-ror-priyanshu-singh.onrender.com/api/v1/subscriptions?plan_type=premium',
      {},
      {
        headers: { Authorization: 'Bearer mock-token' },
      }
    );

    
    expect(mockNavigate).toHaveBeenCalledWith('WebView', {
      url: 'https://example.com/checkout',
    });
  });

  
  it('logs error when checkout fails', async () => {
    /
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

  
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce(JSON.stringify({ role: 'user' })) // userData
      .mockResolvedValueOnce('mock-token'); // token

    
    (axios.post as jest.Mock).mockRejectedValue({
      response: { data: 'Error occurred' },
    });

    const { getByText } = render(<SubscriptionScreen />);

    
    await waitFor(() => {
      const subscribeButton = getByText('Subscribe');
      fireEvent.press(subscribeButton); 
    });

    expect(consoleLogSpy).toHaveBeenCalledWith({ data: 'Error occurred' });

   
    consoleLogSpy.mockRestore();
  });
});