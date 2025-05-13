import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../src/Screen/HomeScreen';


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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        movies: [
          {
            id: '1',
            title: 'Inception',
            rating: 4.5,
            genre: 'Sci-Fi',
            year: 2010
          },
          {
            id: '2',
            title: 'Interstellar',
            rating: 4.7,
            genre: 'Sci-Fi',
            year: 2014
          }
        ]
      })
  })
) as jest.Mock;


describe('Home Screen', () => {
    it('renders the main ImageBackground correctly', () => {
       
        const { getByTestId } = render(<HomeScreen />)
        const imageBackground = getByTestId('mainImageBackground');
        expect(imageBackground).toBeTruthy();
        
    });
   

    it('fetches and renders movie components', async () => {
      const { getAllByTestId } = render(<HomeScreen />);
      const movieComponents = await waitFor(() => getAllByTestId('MovieCom'));
      expect(movieComponents.length).toBeGreaterThan(0); 
    });
  
    it('displays "Movie Explorer" header', () => {
      const { getByText } = render(<HomeScreen />);
      expect(getByText('Movie Explorer')).toBeTruthy();
    });

  it('renders all 3 movie sections', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Trending Now')).toBeTruthy();
    expect(getByText('Popular Movies')).toBeTruthy();
    expect(getByText('Coming soon')).toBeTruthy();
  });
});