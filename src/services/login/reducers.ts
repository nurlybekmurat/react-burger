import { TUserLogin } from '../../utils/types';
import { setCookie } from '../../utils/utils';
import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILED,
  CLEAN_LOGIN_INFO,
  TLoginActions,
} from './actions';

type TState = {
  loginData: TUserLogin | undefined,
  isLoading: boolean,
  errorText: string,
}

export const initialStateLogin: TState = {
  loginData: undefined,
  isLoading: false,
  errorText: '',
}

export const loginReducer = (state: TState = initialStateLogin, action: TLoginActions): TState => {
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
      return { ...state, loginData: undefined, isLoading: false, errorText: action.payload }
    }
    case CLEAN_LOGIN_INFO: {
      return { ...state, loginData: undefined, isLoading: false, errorText: '' }
    }
    default:
      return state
  }
}