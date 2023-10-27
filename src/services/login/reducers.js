import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILED,
  CLEAN_LOGIN_INFO,
} from './actions';

const initialState = {
  loginData: null,
  isLoading: false,
  errorText: '',
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true, errorText: '', }
    }
    case LOGIN_SUCCESS: {
      return { ...state, loginData: {...action.payload}, isLoading: false }
    }
    case LOGIN_FAILED: {
      return { ...state, loginData: null, isLoading: false, errorText: action.payload }
    }
    case CLEAN_LOGIN_INFO: {
      return { ...state, loginData: null, isLoading: false, errorText: '' }
    }
    default:
      return state
  }
}