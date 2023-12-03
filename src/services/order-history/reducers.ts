import { ORDER_HISTORY_CLOSE, ORDER_HISTORY_CLOSED, ORDER_HISTORY_ERROR, ORDER_HISTORY_GET_MESSAGE, ORDER_HISTORY_SUCCESS } from './actions';
import { TOrderFeed } from '../../utils/types';

type TWSState = {
  wsConnected: boolean;
  orderHistory: TOrderFeed | null

  error?: Event;
}

const initialState = {
  wsConnected: false,
  orderHistory: null
};

export const orderHistoryReducer = (state: TWSState = initialState, action: any): TWSState => {
  switch (action.type) {
    case ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case ORDER_HISTORY_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };
    case ORDER_HISTORY_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    case ORDER_HISTORY_CLOSE:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    case ORDER_HISTORY_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orderHistory: action.payload
      };
    default:
      return state;
  }
};