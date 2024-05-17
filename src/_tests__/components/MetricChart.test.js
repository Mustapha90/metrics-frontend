import React from 'react';
import { render, screen } from '@testing-library/react';
import MetricChart from '../../components/MetricChart';
import loadMetrics from '../../services/metricsService';
import '@testing-library/jest-dom';

jest.mock('../../services/metricsService');

jest.mock('react-chartjs-2', () => ({
  Line: (props) => <div data-testid="chart">{JSON.stringify(props)}</div>,
}));

const mockData = {
  data: [
    {
      timestamp: '2024-05-17T12:00:00Z',
      avg_value: 50,
      max_value: 100,
      min_value: 25,
    },
    {
      timestamp: '2024-05-17T13:00:00Z',
      avg_value: 55,
      max_value: 110,
      min_value: 30,
    },
  ],
  metadata: {
    total_pages: 1,
  },
};

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({});
});

test('renders chart with correct props', async () => {
  loadMetrics.mockResolvedValue(mockData);

  render(<MetricChart metricType="electricity_consumption" frequency="1m" />);

  await screen.findByTestId('chart');

  const chartProps = JSON.parse(screen.getByTestId('chart').textContent);

  expect(chartProps.data.labels.length).toBe(2);
  expect(chartProps.data.datasets.length).toBe(3);
  expect(chartProps.options.maintainAspectRatio).toBe(false);
});
