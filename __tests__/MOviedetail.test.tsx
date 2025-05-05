import React from 'react';
import { render } from '@testing-library/react-native';
import MovieDetail from '../src/Screen/MovieDetail';

describe('MovieDetail Screen', () => {
  it('renders the MovieDetail main container', () => {
    const { getByTestId } = render(<MovieDetail />);
    expect(getByTestId('MovieDetailScreen')).toBeTruthy();
  });

  it('renders the blurred background image', () => {
    const { getByTestId } = render(<MovieDetail />);
    expect(getByTestId('BlurredBackground')).toBeTruthy();
  });

  it('renders the main movie image', () => {
    const { getByTestId } = render(<MovieDetail />);
    expect(getByTestId('MainMovieImage')).toBeTruthy();
  });

  it('renders the movie title', () => {
    const { getByTestId } = render(<MovieDetail />);
    expect(getByTestId('MovieTitle')).toBeTruthy();
    
  });

  it('renders the movie tagline', () => {
    const { getByTestId } = render(<MovieDetail />);
    expect(getByTestId('MovieTagline')).toBeTruthy();
  });

  it('renders the movie rating', () => {
    const { getByTestId } = render(<MovieDetail />);
    expect(getByTestId('MovieRating')).toBeTruthy();
  });

  it('renders the release date', () => {
    const { getByTestId } = render(<MovieDetail />);
    expect(getByTestId('ReleaseDate')).toBeTruthy;
  });

  it('renders the movie description', () => {
    const { getByTestId } = render(<MovieDetail />);
    expect(getByTestId('MovieDescriptionText')).toBeTruthy();
  });

 
});