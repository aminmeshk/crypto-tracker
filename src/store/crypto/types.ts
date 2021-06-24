import {AxiosResponse} from 'axios';
import MetricsResponse from '../../models/metricsResponse';

export interface CryptoState {
  cryptoMetrics: {
    cachedData: MetricsResponse[] | null;
    fetchInProgress: boolean;
    error: AxiosResponse | null;
  };
  filteredCryptos: string[];
}

export const GET_METRICS_LIST = 'api/metrics/getList/start';
export const GET_METRICS_LIST_FAILED = 'api/metrics/getList/failed';
export const GET_METRICS_LIST_SUCCESS = 'api/metrics/getList/success';
export const GET_METRICS_LIST_SET_LOADING = 'api/metrics/getList/loading';
export const ADD_CRYPTO = 'local/crypto/add';
export const REMOVE_CRYPTO = 'local/crypto/remove';

export interface GetMetricsAction {
  type: typeof GET_METRICS_LIST;
  payload: string[];
}

interface GetMetricsFailedAction {
  type: typeof GET_METRICS_LIST_FAILED;
  payload: AxiosResponse;
}

interface GetMetricsSuccessAction {
  type: typeof GET_METRICS_LIST_SUCCESS;
  payload: MetricsResponse[];
}

interface GetMetricsSetLoadingAction {
  type: typeof GET_METRICS_LIST_SET_LOADING;
  payload: boolean;
}

interface AddCryptoAction {
  type: typeof ADD_CRYPTO;
  payload: string;
}

interface RemoveCryptoAction {
  type: typeof REMOVE_CRYPTO;
  payload: string;
}

export type CryptoActionTypes =
  | GetMetricsAction
  | GetMetricsFailedAction
  | GetMetricsSuccessAction
  | GetMetricsSetLoadingAction
  | AddCryptoAction
  | RemoveCryptoAction;
