import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../src/Screen/HomeScreen';

describe('Home Screen', () => {
    it('renders the main ImageBackground correctly', () => {
       
        const { getByTestId } = render(<HomeScreen />)
        const imageBackground = getByTestId('mainImageBackground');
        expect(imageBackground).toBeTruthy();
        
    });
    // it('renders the Movie components correctly', async () => {
    //     const { findAllByTestId } = render(<HomeScreen />);
    //     const movieComponents = await findAllByTestId('MovieCom');
    //     expect(movieComponents.length).toBeGreaterThan(0);
    //   });

  it('renders all 3 movie sections', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Trending Now')).toBeTruthy();
    expect(getByText('Popular Movies')).toBeTruthy();
    expect(getByText('Coming soon')).toBeTruthy();
  });
});