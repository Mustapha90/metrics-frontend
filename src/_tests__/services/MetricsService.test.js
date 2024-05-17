import loadMetrics from '../../services/metricsService';
import api from '../../api';

jest.mock('../../api');

const mockSinglePageResponse = {
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
    current_page: 1,
    total_count: 2,
  },
};

const mockMultiPageResponsePage1 = {
  data: [
    {
      timestamp: '2024-05-17T12:00:00Z',
      avg_value: 50,
      max_value: 100,
      min_value: 25,
    },
  ],
  metadata: {
    total_pages: 2,
    current_page: 1,
    total_count: 2,
  },
};

const mockMultiPageResponsePage2 = {
  data: [
    {
      timestamp: '2024-05-17T13:00:00Z',
      avg_value: 55,
      max_value: 110,
      min_value: 30,
    },
  ],
  metadata: {
    total_pages: 2,
    current_page: 2,
    total_count: 2,
  },
};

describe('loadMetrics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches a single page of data', async () => {
    api.get.mockResolvedValueOnce({ data: mockSinglePageResponse });

    const result = await loadMetrics('electricity_consumption', '1m');

    expect(result).toEqual(mockSinglePageResponse);
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith(
      '/api/v1/metrics/aggs/electricity_consumption/1m',
      {
        params: {
          page: 1,
          per_page: 100,
        },
      },
    );
  });

  test('fetches multiple pages of data', async () => {
    api.get
      .mockResolvedValueOnce({ data: mockMultiPageResponsePage1 })
      .mockResolvedValueOnce({ data: mockMultiPageResponsePage2 });

    const result = await loadMetrics('electricity_consumption', '1m');

    expect(result).toEqual({
      metadata: mockMultiPageResponsePage1.metadata,
      data: [
        ...mockMultiPageResponsePage1.data,
        ...mockMultiPageResponsePage2.data,
      ],
    });
    expect(api.get).toHaveBeenCalledTimes(2);
    expect(api.get).toHaveBeenCalledWith(
      '/api/v1/metrics/aggs/electricity_consumption/1m',
      {
        params: {
          page: 1,
          per_page: 100,
        },
      },
    );
    expect(api.get).toHaveBeenCalledWith(
      '/api/v1/metrics/aggs/electricity_consumption/1m',
      {
        params: {
          page: 2,
          per_page: 100,
        },
      },
    );
  });

  test('handles API errors gracefully', async () => {
    api.get.mockRejectedValueOnce(new Error('API error'));

    await expect(loadMetrics('electricity_consumption', '1m')).rejects.toThrow(
      'API error',
    );

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith(
      '/api/v1/metrics/aggs/electricity_consumption/1m',
      {
        params: {
          page: 1,
          per_page: 100,
        },
      },
    );
  });
});
