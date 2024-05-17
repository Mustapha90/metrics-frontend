import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Metrics Dashboard header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Metrics Dashboard/i);
  expect(headerElement).toBeInTheDocument();
});
