import {all, call} from 'redux-saga/effects';
import {watchGetMetrics} from './crypto/sagas';

const rootSaga = function* root() {
  yield all([call(watchGetMetrics)]);
};

export default rootSaga;
