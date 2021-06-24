import {
  CryptoActionTypes,
  CryptoState,
  GET_METRICS_LIST_FAILED,
  GET_METRICS_LIST_SET_LOADING,
  GET_METRICS_LIST_SUCCESS,
} from './types';

const initialCryptoState: CryptoState = {
  cryptoMetrics: {
    fetchInProgress: false,
    cachedData: null,
    error: null,
  },
};

export const cryptoReducer = (
  state = initialCryptoState,
  action: CryptoActionTypes,
): CryptoState => {
  switch (action.type) {
    case GET_METRICS_LIST_SET_LOADING: {
      return {
        ...state,
        cryptoMetrics: {
          ...state.cryptoMetrics,
          fetchInProgress: action.payload,
        },
      };
    }
    case GET_METRICS_LIST_SUCCESS: {
      return {
        ...state,
        cryptoMetrics: {
          ...state.cryptoMetrics,
          cachedData: action.payload,
          fetchInProgress: false,
          error: null,
        },
      };
    }
    case GET_METRICS_LIST_FAILED: {
      return {
        ...state,
        cryptoMetrics: {
          ...state.cryptoMetrics,
          fetchInProgress: false,
          error: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default cryptoReducer;
