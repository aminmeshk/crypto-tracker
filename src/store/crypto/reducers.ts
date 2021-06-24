import {
  ADD_CRYPTO,
  CryptoActionTypes,
  CryptoState,
  GET_METRICS_LIST_FAILED,
  GET_METRICS_LIST_SET_LOADING,
  GET_METRICS_LIST_SUCCESS,
  REMOVE_CRYPTO,
} from './types';

const initialCryptoState: CryptoState = {
  cryptoMetrics: {
    fetchInProgress: false,
    cachedData: null,
    error: null,
  },
  filteredCryptos: [],
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
    case ADD_CRYPTO: {
      const newFiltered = [...state.filteredCryptos];
      if (!newFiltered.includes(action.payload)) {
        newFiltered.push(action.payload);
      }
      return {
        ...state,
        filteredCryptos: newFiltered,
      };
    }
    case REMOVE_CRYPTO: {
      const newFiltered = [...state.filteredCryptos];
      const idx = newFiltered.indexOf(action.payload.toLowerCase());
      if (idx >= 0) {
        newFiltered.splice(idx, 1);
      }
      return {
        ...state,
        filteredCryptos: newFiltered,
      };
    }
    default: {
      return state;
    }
  }
};

export default cryptoReducer;
