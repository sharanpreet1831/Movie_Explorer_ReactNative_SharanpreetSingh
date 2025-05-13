// import React from 'react';
// import { render } from '@testing-library/react-native';
// import MovieDetail from '../src/Screen/MovieDetail';
// import { useRoute } from '@react-navigation/native';


// jest.mock('@react-navigation/native', () => ({
//   useNavigation: jest.fn(),
//   useRoute: jest.fn(),
// }));

// describe('MovieDetail Screen', () => {

//   (useRoute as jest.Mock).mockReturnValue({
//     params: {
//       movie: {
//         title: 'Interstellar',
//         tagline: 'Mankind was born on Earth. It was never meant to die here.',
//         rating: 8.6,
//         releaseDate: '2014-11-07',
//         description: 'A team of explorers travel through a wormhole in space...',
//         image: 'https://example.com/interstellar.jpg',
//         banner: 'https://example.com/banner.jpg',
//       },
//     },
//   });
// });

// it('renders the MovieDetail main container', () => {
//   const { getByTestId, getByText } = render(<MovieDetail />);

//   expect(getByTestId('MovieDetailScreen')).toBeTruthy();
//   expect(getByText('Interstellar')).toBeTruthy();
//   expect(getByText('Mankind was born on Earth. It was never meant to die here.')).toBeTruthy();
// });

//   it('renders the MovieDetail main container', () => {
//     const { getByTestId } = render(<MovieDetail />);
//     expect(getByTestId('MovieDetailScreen')).toBeTruthy();
//   });

//   it('renders the blurred background image', () => {
//     const { getByTestId } = render(<MovieDetail />);
//     expect(getByTestId('BlurredBackground')).toBeTruthy();
//   });

//   it('renders the main movie image', () => {
//     const { getByTestId } = render(<MovieDetail />);
//     expect(getByTestId('MainMovieImage')).toBeTruthy();
//   });

//   it('renders the movie title', () => {
//     const { getByTestId } = render(<MovieDetail />);
//     expect(getByTestId('MovieTitle')).toBeTruthy();
    
//   });

//   it('renders the movie tagline', () => {
//     const { getByTestId } = render(<MovieDetail />);
//     expect(getByTestId('MovieTagline')).toBeTruthy();
//   });

//   it('renders the movie rating', () => {
//     const { getByTestId } = render(<MovieDetail />);
//     expect(getByTestId('MovieRating')).toBeTruthy();
//   });

//   it('renders the release date', () => {
//     const { getByTestId } = render(<MovieDetail />);
//     expect(getByTestId('ReleaseDate')).toBeTruthy;
//   });

//   it('renders the movie description', () => {
//     const { getByTestId } = render(<MovieDetail />);
//     expect(getByTestId('MovieDescriptionText')).toBeTruthy();
//   });

 
// });



import React from 'react';
import { render } from '@testing-library/react-native';
import MovieDetail from '../src/Screen/MovieDetail';

// ✅ Mock before import
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useRoute: jest.fn(),
}));

import { useRoute } from '@react-navigation/native';

describe('MovieDetail Screen', () => {
  // ✅ Setup mock return value before each test
  beforeEach(() => {
    (useRoute as jest.Mock).mockReturnValue({
      params: {
        movie: {
          title: 'Interstellar',
          director: 'lee issac chung',
          rating: 8.6,
          releaseDate: '2014-11-07',
          description: 'A team of explorers travel through a wormhole in space...',
          image: 'https://example.com/interstellar.jpg',
          banner: 'https://example.com/banner.jpg',
       
        genre: {
          name: 'Sci-Fi',
        },
      },
      },
    });
  });

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
    const { getByText } = render(<MovieDetail />);
    expect(getByText('Interstellar')).toBeTruthy();
  });

  it('renders the movie Moviedirector', () => {
    const { getByText } = render(<MovieDetail />);
    expect(getByText('Director: lee issac chung')).toBeTruthy();
  });

  it('renders the movie rating', () => {
    const { getByTestId } = render(<MovieDetail />);
    expect(getByTestId('MovieRating')).toBeTruthy();
  });

  it('renders the release date', () => {
    const { getByTestId } = render(<MovieDetail />);
    expect(getByTestId('ReleaseDate')).toBeTruthy();
  });

  it('renders the movie description', () => {
    const { getByTestId } = render(<MovieDetail />);
    expect(getByTestId('MovieDescriptionText')).toBeTruthy();
  });
});
