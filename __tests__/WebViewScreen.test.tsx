import React from 'react';
import { render } from '@testing-library/react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import WebViewScreen from '../src/Screen/WebViewScreen';


jest.mock('@react-navigation/native', () => {
  return {
    useRoute: jest.fn(),
    useNavigation: jest.fn(),
  };
});

jest.mock('react-native-webview', () => {
 
  const ReactNative = require('react'); // locally require React

  return {
    WebView: (props: any) => {
      ReactNative.useEffect(() => {
        props.onNavigationStateChange({ url: 'https://example.com/success' });
      }, []);
      return null;
    },
  };
});

describe('WebViewScreen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {
        url: 'https://example.com',
      },
    });

    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });

    mockNavigate.mockClear();
  });

  it('navigates to Success when WebView URL contains "success"', () => {
    render(<WebViewScreen />);
    expect(mockNavigate).toHaveBeenCalledWith('Success');
  });
});
