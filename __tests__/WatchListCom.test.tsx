import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WacthListMovieCom from '../src/Component/WacthListMovieCom';


describe('WacthListMovieCom', () => {
    it('renders the main container', () => {
        const { getByTestId } = render(<WacthListMovieCom />);
        expect(getByTestId('watchlist-container')).toBeTruthy();
      });
    
      it('renders the poster placeholder', () => {
        const { getByTestId } = render(<WacthListMovieCom />);
        expect(getByTestId('poster-placeholder')).toBeTruthy();
      });
    
      it('renders the details container', () => {
        const { getByTestId } = render(<WacthListMovieCom />);
        expect(getByTestId('details-container')).toBeTruthy();
      });
    
      it('displays movie title correctly', () => {
        const { getByTestId } = render(<WacthListMovieCom />);
        expect(getByTestId('movie-title')).toBeTruthy();
      });
    
      it('displays movie year and duration', () => {
        const { getByTestId } = render(<WacthListMovieCom />);
        expect(getByTestId('movie-year')).toBeTruthy();
        expect(getByTestId('movie-duration')).toBeTruthy();
      });
    
      it('shows movie rating', () => {
        const { getByTestId } = render(<WacthListMovieCom />);
        expect(getByTestId('movie-score')).toBeTruthy();
      });
    
      it('renders remove button container and text', () => {
        const { getByTestId, getByText } = render(<WacthListMovieCom />);
        expect(getByTestId('remove-button-container')).toBeTruthy();
        expect(getByText('Remove')).toBeTruthy();
      });
});