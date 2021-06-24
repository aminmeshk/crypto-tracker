import axios from 'axios';

export const getMetricsList = async (): Promise<unknown> => {
  const response = await axios.get<unknown>(
    'https://data.messari.io/api/v1/assets/btc/metrics',
  );
  return response.data;
};
