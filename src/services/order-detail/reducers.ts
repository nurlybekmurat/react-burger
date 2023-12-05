import { TOrderOptions } from '../../utils/types';
import { 
  GET_ORDER_REQUEST, 
  GET_ORDER_SUCCESS, 
  GET_ORDER_FAILED,
  TGetOrderFailedActions,
} from './actions';

type TOrderDetailState = {
  order: TOrderOptions | undefined,
  isLoading: boolean,
  error: boolean,
  errorText: string
}

const initialState = {
  order: undefined,
  isLoading: false,
  error: false,
  errorText: ''
}

export const orderReducer = (state: TOrderDetailState = initialState, action: TGetOrderFailedActions): TOrderDetailState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, isLoading: true, errorText: '', order: undefined }
    }
    case GET_ORDER_SUCCESS: {
      console.log(action.element)
      return { ...state, order: action.element.order, isLoading: false }
    }
    case GET_ORDER_FAILED: {
      return { ...state, order: undefined, errorText: action.element, isLoading: false }
    }
    default:
      return state
  }
}