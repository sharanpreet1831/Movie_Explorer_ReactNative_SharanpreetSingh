import React from "react";
import ExplorerScreen from "../src/Screen/ExplorerScreen";
import { render, fireEvent } from '@testing-library/react-native';
import MovieData from '.././src/Data/MovieData.json';




describe ('ExplorerScreen' ,() => {
    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(<ExplorerScreen />);
        expect(getByPlaceholderText('Search')).toBeTruthy();
        expect(getByText('Action')).toBeTruthy();
        expect(getByText('Comedy')).toBeTruthy();
      });

    
})