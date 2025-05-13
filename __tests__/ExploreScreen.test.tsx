import React from "react";
import ExplorerScreen from "../src/Screen/ExplorerScreen";
import { render, fireEvent } from '@testing-library/react-native';
import MovieData from '.././src/Data/MovieData.json';


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


describe ('ExplorerScreen' ,() => {
    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(<ExplorerScreen />);
        expect(getByPlaceholderText('Search')).toBeTruthy();
        expect(getByText('Action')).toBeTruthy();
        expect(getByText('Comedy')).toBeTruthy();
      });

    
})



