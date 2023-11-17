import { 
  GET_ORDER_REQUEST, 
  GET_ORDER_SUCCESS, 
  GET_ORDER_FAILED,
} from './actions';

type TOrderDetailState = {
  orderID: string,
  isLoading: boolean,
  error: boolean,
  errorText: string
}

const initialState = {
  orderID: '',
  isLoading: false,
  error: false,
  errorText: ''
}

export const orderReducer = (state: TOrderDetailState = initialState, action: any): TOrderDetailState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, isLoading: true, errorText: '', orderID: '' }
    }
    case GET_ORDER_SUCCESS: {
      console.log(action)
      return { ...state, orderID: action.element.order.number, isLoading: false }
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderID: '', errorText: action.element, isLoading: false }
    }
    default:
      return state
  }
}