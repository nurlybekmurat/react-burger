import { setCookie } from '../../utils/utils';
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILED,
  CLEAN_LOGIN_INFO,
} from './actions';

// type TLoginState = {
//   loginData: {},
//   isLoading: boolean,
//   errorText: string,
// }

const initialState = {
  loginData: null,
  isLoading: false,
  errorText: '',
}

export const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, isLoading: true, errorText: '', }
    }
    case LOGIN_SUCCESS: {
      setCookie('refreshToken', action.payload.refreshToken);
      setCookie('token', action.payload.accessToken);
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