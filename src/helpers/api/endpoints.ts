import axios from 'axios';
import MetricsResponse from '../../models/metricsResponse';

export const getMetricsList = async (
  coins: string[],
): Promise<MetricsResponse[]> => {
  const calls = coins.map((symbol) => createMetricsCall(symbol));
  const responses = await Promise.all(calls);
  return responses.map((result) => result.data);
};

const createMetricsCall = (coinSymbol: string) => {
  return axios.get<MetricsResponse>(
    `https://data.messari.io/api/v1/assets/${coinSymbol.toLowerCase()}/metrics/market-data?fields=id,symbol,name,market_data/price_usd,market_data/percent_change_usd_last_24_hours`,
  );
};
