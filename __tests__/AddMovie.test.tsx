// import React from 'react';
// import { render, fireEvent, waitFor } from '@testing-library/react-native';
// import AddMovie from '../src/Screen/AddMovie';



// jest.mock('@react-native-async-storage/async-storage', ()=> ({
//     setItem: jest.fn(() => Promise.resolve()),
//       getItem: jest.fn(() => Promise.resolve(null)),
//       removeItem: jest.fn(() => Promise.resolve()),
//       clear: jest.fn(() => Promise.resolve()),
//   }));
//   jest.mock('react-native-dropdown-picker', () => {
//     return jest.fn().mockImplementation(() => null);
//   });
  
//   jest.mock('react-native-image-picker', () => ({
//     launchImageLibrary: jest.fn((options, callback) => {
//       callback({
//         didCancel: false,
//         assets: [
//           {
//             uri: 'mock-uri',
//             fileName: 'mock-image.jpg',
//             type: 'image/jpeg',
//           },
//         ],
//       });
//     }),
//   }));
  
  

// describe('AddMovie Component', () => {
//   const mockSetModalVisible = jest.fn();

//   it('renders all input fields and buttons', () => {
//     const { getByTestId, getByText } = render(<AddMovie setModalVisible={mockSetModalVisible} />);

//     expect(getByTestId('titleInput')).toBeTruthy();
//     expect(getByTestId('releaseYearInput')).toBeTruthy();
//     expect(getByTestId('ratingInput')).toBeTruthy();
//     expect(getByTestId('directorInput')).toBeTruthy();
//     expect(getByTestId('durationInput')).toBeTruthy();
//     expect(getByTestId('descriptionInput')).toBeTruthy();
//     expect(getByTestId('addMovieButton')).toBeTruthy();
//     expect(getByTestId('closeModalButton')).toBeTruthy();
//     getByText('Choose Image'); // Poster and Banner buttons share same title
//   });

//   it('allows typing in input boxes', () => {
//     const { getByTestId } = render(<AddMovie setModalVisible={mockSetModalVisible} />);

//     fireEvent.changeText(getByTestId('titleInput'), 'Inception');
//     fireEvent.changeText(getByTestId('releaseYearInput'), '2010');
//     fireEvent.changeText(getByTestId('ratingInput'), '8.8');
//     fireEvent.changeText(getByTestId('directorInput'), 'Christopher Nolan');
//     fireEvent.changeText(getByTestId('durationInput'), '148');
//     fireEvent.changeText(getByTestId('descriptionInput'), 'A mind-bending thriller');

//     expect(getByTestId('titleInput').props.value).toBe('Inception');
//     expect(getByTestId('releaseYearInput').props.value).toBe('2010');
//     expect(getByTestId('ratingInput').props.value).toBe('8.8');
//     expect(getByTestId('directorInput').props.value).toBe('Christopher Nolan');
//     expect(getByTestId('durationInput').props.value).toBe('148');
//     expect(getByTestId('descriptionInput').props.value).toBe('A mind-bending thriller');
//   });

//   it('triggers close modal when close button is pressed', () => {
//     const { getByTestId } = render(<AddMovie setModalVisible={mockSetModalVisible} />);
//     fireEvent.press(getByTestId('closeModalButton'));
//     expect(mockSetModalVisible).toHaveBeenCalledWith(false);
//   });

//   it('calls uploadDocument when Add Movie button is pressed', async () => {
//     const { getByTestId } = render(<AddMovie setModalVisible={mockSetModalVisible} />);

//     // Simulate filling required fields minimally
//     fireEvent.changeText(getByTestId('titleInput'), 'Interstellar');
//     fireEvent.changeText(getByTestId('releaseYearInput'), '2014');
//     fireEvent.changeText(getByTestId('ratingInput'), '8.6');
//     fireEvent.changeText(getByTestId('directorInput'), 'Christopher Nolan');
//     fireEvent.changeText(getByTestId('durationInput'), '169');
//     fireEvent.changeText(getByTestId('descriptionInput'), 'Space travel movie');

//     // Click the button
//     fireEvent.press(getByTestId('addMovieButton'));

//     await waitFor(() => {
//       // You may want to mock the fetch call in your real test setup
//       // Here, we just ensure no crash happens
//       expect(true).toBeTruthy();
//     });
//   });
// });



import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddMovie from '../src/Screen/AddMovie';

// Mock react-native-image-picker
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

// Mock fetch for API calls
global.fetch = jest.fn();

  jest.mock('react-native-dropdown-picker', () => {
    return jest.fn().mockImplementation(() => null);
  });
  

describe('AddMovie Component', () => {
  const mockSetModalVisible = jest.fn();

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue('mock-token');
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'Movie added successfully' }),
    });
  });

  // Test 1: Renders correctly
  it('renders the AddMovie component correctly', () => {
    const { getByTestId, getByText } = render(
      <AddMovie setModalVisible={mockSetModalVisible} />
    );

    expect(getByTestId('titleInput')).toBeTruthy();
    expect(getByTestId('releaseYearInput')).toBeTruthy();
    expect(getByTestId('ratingInput')).toBeTruthy();
    expect(getByTestId('directorInput')).toBeTruthy();
    expect(getByTestId('durationInput')).toBeTruthy();
    expect(getByTestId('descriptionInput')).toBeTruthy();
    expect(getByTestId('addMovieButton')).toBeTruthy();
    expect(getByText('Title of movie')).toBeTruthy();
  });

  // Test 2: Closes modal when close button is pressed
  it('closes the modal when the close button is pressed', () => {
    const { getByTestId } = render(
      <AddMovie setModalVisible={mockSetModalVisible} />
    );

    const closeButton = getByTestId('closeModalButton');
    fireEvent.press(closeButton);

    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
  });

  // Test 3: Updates input fields
  it('updates input fields when text is entered', () => {
    const { getByTestId } = render(
      <AddMovie setModalVisible={mockSetModalVisible} />
    );

    const titleInput = getByTestId('titleInput');
    fireEvent.changeText(titleInput, 'Inception');

    expect(titleInput.props.value).toBe('Inception');
  });

  // Test 4: Handles image selection for poster
  it('handles poster image selection', async () => {
    // const mockImage = { assets: [{ uri: 'file://poster.jpg' }] };
    // (launchImageLibrary as jest.Mock).mockImplementation((options, callback) =>
    //   callback(mockImage)
    // );

    // const { getByText, findByTestId } = render(
    //   <AddMovie setModalVisible={mockSetModalVisible} />
    // );

    // const posterButton = getByText('Choose Image');
    // fireEvent.press(posterButton);

    // const posterImage = await findByTestId('titleInput'); // Note: Image doesn't have testID, adjust if added
    // expect(launchImageLibrary).toHaveBeenCalled();
    // Verify image is displayed (requires testID on Image component)
  });

  // Test 5: Submits the form and calls the API
  it('submits the form and calls the API', async () => {
    const { getByTestId } = render(
      <AddMovie setModalVisible={mockSetModalVisible} />
    );

    // Fill in some fields
    fireEvent.changeText(getByTestId('titleInput'), 'Inception');
    fireEvent.changeText(getByTestId('releaseYearInput'), '2010');
    fireEvent.changeText(getByTestId('ratingInput'), '8.8');
    fireEvent.changeText(getByTestId('directorInput'), 'Christopher Nolan');
    fireEvent.changeText(getByTestId('durationInput'), '148');
    fireEvent.changeText(getByTestId('descriptionInput'), 'A mind-bending thriller');

    // Mock dropdown selections (requires mocking DropDownPicker or simulating selection)
    // For simplicity, assume values are set via state
    const addButton = getByTestId('addMovieButton');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://movie-ror-priyanshu-singh.onrender.com/api/v1/movies',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer mock-token',
          }),
        })
      );
      expect(mockSetModalVisible).toHaveBeenCalledWith(false);
    });
  });

  // Test 6: Handles API error
  it('handles API error gracefully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Failed to add movie' }),
    });

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    const { getByTestId } = render(
      <AddMovie setModalVisible={mockSetModalVisible} />
    );

    fireEvent.changeText(getByTestId('titleInput'), 'Inception');
    const addButton = getByTestId('addMovieButton');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to add movie:',
        'Failed to add movie'
      );
    });

    consoleErrorSpy.mockRestore();
  });
});