import {AxiosResponse} from 'axios';
import {call, put, StrictEffect, takeLatest} from 'redux-saga/effects';
import {getMetricsList} from '../../helpers/api/endpoints';
import MetricsResponse from '../../models/metricsResponse';
import {
  getMetricsFailed,
  getMetricsSuccess,
  setMetricsLoading,
} from './actions';
import {GET_METRICS_LIST} from './types';

export function* getMetricsSaga(): Generator<
  StrictEffect,
  void,
  MetricsResponse
> {
  try {
    yield put(setMetricsLoading(true));
    const result = yield call(getMetricsList);
    yield put(getMetricsSuccess(result));
  } catch (error) {
    const {errorResponse}: {errorResponse: AxiosResponse} = error;
    yield put(getMetricsFailed(errorResponse));
  }
}

export function* watchGetMetrics() {
  yield takeLatest(GET_METRICS_LIST, getMetricsSaga);
}
