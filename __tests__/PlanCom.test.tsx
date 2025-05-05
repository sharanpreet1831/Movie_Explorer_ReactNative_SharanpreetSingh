import React from 'react';
import { render } from '@testing-library/react-native';
import PlanComponent from '../src/Component/PlanComponent';


describe('PlanComponent', () => {
    it('renders the plan card', () => {
        const { getByTestId } = render(<PlanComponent />);
        expect(getByTestId('plan-card')).toBeTruthy();
    });

    it('displays the correct title', () => {
        const { getByTestId } = render(<PlanComponent />);
        expect(getByTestId('plan-title')).toBeTruthy();
    });

    it('displays the correct price', () => {
        const { getByTestId } = render(<PlanComponent />);
        expect(getByTestId('plan-price')).toBeTruthy();
    });

    it('displays all features correctly', () => {
        const { getByTestId } = render(<PlanComponent />);
        expect(getByTestId('feature-1')).toBeTruthy();
        expect(getByTestId('feature-2')).toBeTruthy();
        expect(getByTestId('feature-3')).toBeTruthy();
        expect(getByTestId('feature-4')).toBeTruthy();
    });
});