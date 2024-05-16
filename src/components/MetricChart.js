import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import BounceLoader from 'react-spinners/BounceLoader';
import loadMetrics from '../services/metricsService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function MetricChart({ metricType, frequency }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (type, freq) => {
    setLoading(true);
    try {
      const result = await loadMetrics(type, freq);
      setData(result);
    } catch (error) {
      console.debug(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(metricType, frequency);
  }, [metricType, frequency]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <BounceLoader color="#123abc" loading={loading} size={60} />
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <p>No data available</p>
      </div>
    );
  }

  const chartData = {
    labels: data.data.map((item) => new Date(item.timestamp).toLocaleString()),
    datasets: [
      {
        label: 'Average Value',
        data: data.data.map((item) => item.avg_value),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
        hidden: false,
      },
      {
        label: 'Max Value',
        data: data.data.map((item) => item.max_value),
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false,
        hidden: true,
      },
      {
        label: 'Min Value',
        data: data.data.map((item) => item.min_value),
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false,
        hidden: true,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: 'rgba(0, 0, 0, 0.8)',
          font: {
            size: 14,
          },
          usePointStyle: true,
          padding: 20,
          boxWidth: 20,
          boxHeight: 20,
          generateLabels: (chart) => {
            const { datasets } = chart.data;
            return datasets.map((dataset, i) => ({
              text: dataset.label,
              fillStyle: dataset.borderColor,
              hidden: dataset.hidden,
              lineCap: dataset.borderCapStyle,
              lineDash: dataset.borderDash,
              lineDashOffset: dataset.borderDashOffset,
              lineJoin: dataset.borderJoinStyle,
              lineWidth: dataset.borderWidth,
              strokeStyle: dataset.borderColor,
              pointStyle: dataset.pointStyle,
              datasetIndex: i,
            }));
          },
        },
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          const { chart } = legend;
          chart.data.datasets = chart.data.datasets.map((dataset, i) => ({
            ...dataset,
            hidden: i !== index,
          }));
          chart.update();
        },
      },
    },
  };

  return (
    <div className="w-full h-96 sm:w-3/4 md:w-2/3 lg:w-4/5 xl:w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}

MetricChart.propTypes = {
  metricType: PropTypes.string.isRequired,
  frequency: PropTypes.string.isRequired,
};

export default MetricChart;
