import api from '../api';

const loadMetrics = async (metricType, frequency) => {
  const fetchPage = async (page) => {
    const response = await api.get(
      `/api/v1/metrics/aggs/${metricType}/${frequency}`,
      {
        params: {
          page,
          per_page: 100,
        },
      },
    );
    return response.data;
  };

  const firstPageData = await fetchPage(1);
  let allData = firstPageData.data;

  const totalPages = firstPageData.metadata.total_pages;

  if (totalPages > 1) {
    const pagePromises = [];
    for (let page = 2; page <= totalPages; page += 1) {
      pagePromises.push(fetchPage(page));
    }

    const remainingPagesData = await Promise.all(pagePromises);
    remainingPagesData.forEach((pageData) => {
      allData = allData.concat(pageData.data);
    });
  }

  return {
    metadata: firstPageData.metadata,
    data: allData,
  };
};

export default loadMetrics;
