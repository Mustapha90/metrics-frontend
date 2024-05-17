import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MetricsViewer from '../../components/MetricsViewer';
import '@testing-library/jest-dom';

jest.mock(
  '../../components/MetricChart',
  () =>
    function (props) {
      return <div data-testid="metric-chart">{JSON.stringify(props)}</div>;
    },
);

describe('MetricsViewer', () => {
  test('renders correctly', () => {
    render(<MetricsViewer />);

    expect(screen.getByText(/Metrics Viewer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Metric:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Frequency:/i)).toBeInTheDocument();
    expect(screen.getByTestId('metric-chart')).toBeInTheDocument();
  });

  test('changes metric type', () => {
    render(<MetricsViewer />);

    const selectMetric = screen.getByLabelText(/Select Metric:/i);
    fireEvent.change(selectMetric, {
      target: { value: 'electricity_voltage' },
    });

    expect(selectMetric.value).toBe('electricity_voltage');
    expect(screen.getByTestId('metric-chart')).toHaveTextContent(
      'electricity_voltage',
    );
  });

  test('changes frequency', () => {
    render(<MetricsViewer />);

    const selectFrequency = screen.getByLabelText(/Select Frequency:/i);
    fireEvent.change(selectFrequency, { target: { value: '1h' } });

    expect(selectFrequency.value).toBe('1h');
    expect(screen.getByTestId('metric-chart')).toHaveTextContent('1h');
  });

  test('renders MetricChart with correct props', () => {
    render(<MetricsViewer />);

    const metricChart = screen.getByTestId('metric-chart');
    expect(metricChart).toHaveTextContent('electricity_consumption');
    expect(metricChart).toHaveTextContent('1m');
  });
});
