import {AxiosResponse} from 'axios';
import {call, put, StrictEffect, takeLatest} from 'redux-saga/effects';
import {getMetricsList} from '../../helpers/api/endpoints';
import MetricsResponse from '../../models/metricsResponse';
import {
  getMetricsFailed,
  getMetricsSuccess,
  setMetricsLoading,
} from './actions';
import {GetMetricsAction, GET_METRICS_LIST} from './types';

export function* getMetricsSaga(
  action: GetMetricsAction,
): Generator<StrictEffect, void, MetricsResponse[]> {
  try {
    yield put(setMetricsLoading(true));
    const result = yield call(getMetricsList, action.payload);
    yield put(getMetricsSuccess(result));
  } catch (error) {
    const {errorResponse}: {errorResponse: AxiosResponse} = error;
    yield put(getMetricsFailed(errorResponse));
  }
}

export function* watchGetMetrics() {
  yield takeLatest(GET_METRICS_LIST, getMetricsSaga);
}
