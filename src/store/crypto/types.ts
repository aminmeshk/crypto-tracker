import {AxiosResponse} from 'axios';
import MetricsResponse from '../../models/metricsResponse';

export interface CryptoState {
  cryptoMetrics: {
    cachedData: MetricsResponse | null;
    fetchInProgress: boolean;
    error: AxiosResponse | null;
  };
}

export const GET_METRICS_LIST = 'api/metrics/getList/start';
export const GET_METRICS_LIST_FAILED = 'api/metrics/getList/failed';
export const GET_METRICS_LIST_SUCCESS = 'api/metrics/getList/success';
export const GET_METRICS_LIST_SET_LOADING = 'api/metrics/getList/loading';

interface GetMetricsAction {
  type: typeof GET_METRICS_LIST;
}

interface GetMetricsFailedAction {
  type: typeof GET_METRICS_LIST_FAILED;
  payload: AxiosResponse;
}

interface GetMetricsSuccessAction {
  type: typeof GET_METRICS_LIST_SUCCESS;
  payload: MetricsResponse;
}

interface GetMetricsSetLoadingAction {
  type: typeof GET_METRICS_LIST_SET_LOADING;
  payload: boolean;
}

export type CryptoActionTypes =
  | GetMetricsAction
  | GetMetricsFailedAction
  | GetMetricsSuccessAction
  | GetMetricsSetLoadingAction;
