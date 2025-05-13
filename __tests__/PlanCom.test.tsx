import React from 'react';
import { render } from '@testing-library/react-native';
import PlanComponent from '../src/Component/PlanComponent';

const mockPlanData = {
  PlanName: 'Basic',
  PlanPrice: 9.99,
  PlanFeature: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
};

describe('PlanComponent', () => {
  it('renders the plan card', () => {
    const { getByTestId } = render(<PlanComponent plandata={mockPlanData} />);
    expect(getByTestId('plan-card')).toBeTruthy();
  });

  it('displays the correct title', () => {
    const { getByTestId } = render(<PlanComponent plandata={mockPlanData} />);
    expect(getByTestId('plan-title').props.children).toBe('Basic');
  });

  it('displays the correct price', () => {
    const { getByTestId } = render(<PlanComponent plandata={mockPlanData} />);
    expect(getByTestId('plan-price').props.children).toEqual(['$', 9.99, ' / month']);
  });

  it('displays all features correctly', () => {
    const { getByTestId } = render(<PlanComponent plandata={mockPlanData} />);
    mockPlanData.PlanFeature?.forEach((_, i) => {
      expect(getByTestId(`feature-${i + 1}`)).toBeTruthy();
    });
  });
});
