import React, { useState } from 'react';
import MetricChart from './MetricChart';

const metricOptions = [
  { value: 'electricity_consumption', label: 'Electricity Consumption' },
  { value: 'electricity_voltage', label: 'Electricity Voltage' },
];

const frequencyOptions = [
  { value: '1m', label: '1 Minute' },
  { value: '1h', label: '1 Hour' },
  { value: '1d', label: '1 Day' },
];

function MetricsViewer() {
  const [metricType, setMetricType] = useState('electricity_consumption');
  const [frequency, setFrequency] = useState('1m');

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Metrics Viewer
      </h2>
      <div className="mb-4">
        <label htmlFor="metricType" className="mr-2">
          Select Metric:
        </label>
        <select
          id="metricType"
          value={metricType}
          onChange={(e) => setMetricType(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {metricOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="frequency" className="mr-2">
          Select Frequency:
        </label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {frequencyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <MetricChart metricType={metricType} frequency={frequency} />
    </div>
  );
}

export default MetricsViewer;
