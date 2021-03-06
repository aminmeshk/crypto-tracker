import {AxiosResponse} from 'axios';
import MetricsResponse from '../../models/metricsResponse';
import {
  ADD_CRYPTO,
  CryptoActionTypes,
  GET_METRICS_LIST,
  GET_METRICS_LIST_FAILED,
  GET_METRICS_LIST_SET_LOADING,
  GET_METRICS_LIST_SUCCESS,
  REMOVE_CRYPTO,
} from './types';

export const getMetricsStart = (coinSymbols: string[]): CryptoActionTypes => ({
  type: GET_METRICS_LIST,
  payload: coinSymbols,
});

export const getMetricsSuccess = (
  result: MetricsResponse[],
): CryptoActionTypes => ({
  type: GET_METRICS_LIST_SUCCESS,
  payload: result,
});

export const getMetricsFailed = (error: AxiosResponse): CryptoActionTypes => ({
  type: GET_METRICS_LIST_FAILED,
  payload: error,
});

export const setMetricsLoading = (isLoading: boolean): CryptoActionTypes => ({
  type: GET_METRICS_LIST_SET_LOADING,
  payload: isLoading,
});

export const addCrypto = (symbol: string): CryptoActionTypes => ({
  type: ADD_CRYPTO,
  payload: symbol,
});

export const removeCrypto = (symbol: string): CryptoActionTypes => ({
  type: REMOVE_CRYPTO,
  payload: symbol,
});
