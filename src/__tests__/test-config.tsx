import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

describe('Testing Library Setup', () => {
  it('should verify testing library configuration', () => {
    const TestComponent = () => <div>Test Configuration</div>;
    render(<TestComponent />);
    expect(screen.getByText('Test Configuration')).toBeInTheDocument();
  });
});