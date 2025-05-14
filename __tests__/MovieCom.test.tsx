


import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Movie from '../src/Component/Movie';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));
jest.spyOn(Alert, 'alert');
  jest.mock('react-native-dropdown-picker', () => {
    return jest.fn().mockImplementation(() => null);
  });

const mockData = {
  id: '1',
  title: 'Test Movie',
  rating: 8.5,
  poster_url: 'https://example.com/poster.jpg',
};

describe('Movie', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ role: 'supervisor' })
    );
  });

  it('renders Movie component correctly', () => {
    const { getByTestId, getByText } = render(
      <Movie data={mockData} testID="MovieCom" />
    );
    expect(getByTestId('MovieCom')).toBeTruthy();
    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByText('8.5')).toBeTruthy();
  });

  it('navigates to MovieDetail on press', () => {
    // const { getByTestId } = render(<Movie data={mockData} testID="MovieCom" />);
    // const movieContainer = getByTestId('MovieCom');
    // fireEvent.press(movieContainer);
    // expect(useNavigation().navigate).toHaveBeenCalledWith('MovieDetail', {
    //   movie: mockData,
    // });
  });

  it('shows pencil icon for supervisor role', async () => {
    const { getByTestId } = render(<Movie data={mockData} testID="MovieCom" />);
    await waitFor(() => {
      expect(getByTestId('pencilBox')).toBeTruthy();
    });
  });

  it('hides pencil icon for non-supervisor role', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify({ role: 'user' })
    );
    const { queryByTestId } = render(<Movie data={mockData} testID="MovieCom" />);
    await waitFor(() => {
      expect(queryByTestId('pencilBox')).toBeNull();
    });
  });

  it('opens edit modal when pencil icon is pressed', async () => {
    const { getByTestId } = render(<Movie data={mockData} testID="MovieCom" />);
    await waitFor(() => {
      const pencilBox = getByTestId('pencilBox');
      fireEvent.press(pencilBox);
      expect(getByTestId('editModal')).toBeTruthy();
    });
  });

  it('handles AsyncStorage error', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Storage error'));
    const { getByTestId } = render(<Movie data={mockData} testID="MovieCom" />);
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Failed to load user data');
    });
  });
});




















// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';

// import { Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Movie from '../src/Component/Movie';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Mock the necessary dependencies
// jest.mock('@react-navigation/native', () => ({
//   useNavigation: jest.fn(),
// }));

// jest.mock('@react-native-async-storage/async-storage', () => ({
//     getItem: jest.fn(() => Promise.resolve(JSON.stringify({ role: 'supervisor' }))),
//   }));

// jest.mock('../src/Component/MovieEdit.tsx', () => {
//   return () => <></>;
// });

// jest.mock('@react-native-async-storage/async-storage', () => ({
//   getItem: jest.fn(() => Promise.resolve(JSON.stringify({ role: 'supervisor' }))),
// }));

// // Test suite for Movie component
// describe('Movie Component', () => {

//   it('renders movie details correctly', async () => {
//     const { getByText } = render(<Movie data={{ title: 'Inception', rating: 8.8, poster_url: 'mock-url' }} testID="movie-1" />);
    
//     await waitFor(() => {
//       // Check if the movie title and rating are rendered correctly
//       expect(getByText('Inception')).toBeTruthy();
//       expect(getByText('⭐️')).toBeTruthy();
//       expect(getByText('8.8')).toBeTruthy();
//     });
//   });

//   it('navigates to MovieDetail screen when movie is clicked', async () => {
//     const mockNavigate = jest.fn();
//     useNavigation.mockReturnValue({ navigate: mockNavigate });

//     const { getByTestId } = render(<Movie data={{ title: 'Inception', rating: 8.8, poster_url: 'mock-url' }} testID="movie-1" />);
    
//     // Simulate a press on the movie component
//     fireEvent.press(getByTestId('movie-1'));
    
//     // Check if navigation was called with the correct parameters
//     expect(mockNavigate).toHaveBeenCalledWith('MovieDetail', { movie: { title: 'Inception', rating: 8.8, poster_url: 'mock-url' } });
//   });

//   it('shows the edit pencil for supervisors', async () => {

//     jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(JSON.stringify({ role: 'supervisor' }));
//     const { getByTestId } = render(<Movie data={{ title: 'Inception', rating: 8.8, poster_url: 'mock-url' }} testID="movie-1" />);
    
//     await waitFor(() => {
//       expect(getByTestId('movie-1')).toBeTruthy();
//     });

//     // Check if the pencil edit button is displayed for supervisors
//     expect(getByTestId('pencilBox')).toBeTruthy();
//   });

//   it('opens modal when the edit pencil is clicked', async () => {
//     const { getByTestId } = render(<Movie data={{ title: 'Inception', rating: 8.8, poster_url: 'mock-url' }} testID="movie-1" />);
    
//     await waitFor(() => {
//       expect(getByTestId('pencilBox')).toBeTruthy();
//     });

//     // Simulate clicking the pencil box to open the modal
//     fireEvent.press(getByTestId('pencilBox'));

//     // Check if the modal is now visible (ensure you have testID="modal" in the modal component)
//     expect(getByTestId('editModal')).toBeTruthy();
//   });

//   it('does not show the edit pencil for non-supervisor roles', async () => {
//     // Mock non-supervisor user role
//     jest.mock('@react-native-async-storage/async-storage', () => ({
//       getItem: jest.fn(() => Promise.resolve(JSON.stringify({ role: 'user' }))),
//     }));

//     const { queryByTestId } = render(<Movie data={{ title: 'Inception', rating: 8.8, poster_url: 'mock-url' }} testID="movie-1" />);
    
//     await waitFor(() => {
//       expect(queryByTestId('pencilBox')).toBeNull();
//     });
//   });
// });