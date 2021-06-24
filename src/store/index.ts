import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {cryptoReducer} from './crypto/reducers';
import rootSaga from './index-sagas';

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(cryptoReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

export default store;
