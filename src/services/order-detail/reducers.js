import { 
  GET_ORDER_REQUEST, 
  GET_ORDER_SUCCESS, 
  GET_ORDER_FAILED,
} from './actions';

const initialState = {
  orderID: '',
  isLoading: false,
  error: false,
  errorText: ''
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return { ...state, isLoading: true, errorText: '', orderID: '' }
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, orderID: action.element, isLoading: false }
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderID: '', errorText: action.element, isLoading: false }
    }
    default:
      return state
  }
}