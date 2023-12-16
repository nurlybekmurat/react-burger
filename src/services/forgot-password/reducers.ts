import { GET_PASSWORD_SUCCESS, GET_PASSWORD_REQUEST, GET_PASSWORD_FAILED, GET_PASSWORD_CLEAN, RECOVER_PASSWORD_CLEAN, TForgotPasswordActions } from './actions';

type TForgotPasswordState = {
  isLoading: boolean,
  success: boolean,
  isRequestSent: boolean,
  emailRecoverSuccess: boolean, 
  errorText: string
}

export const initialStateForgotPass = {
  isLoading: false,
  success: false,
  isRequestSent: false,
  emailRecoverSuccess: false, 
  errorText: ''
}

export const recoverPasswordReducer = (state: TForgotPasswordState = initialStateForgotPass, action: TForgotPasswordActions): TForgotPasswordState => {
  switch (action.type) {
    case GET_PASSWORD_REQUEST: {
      return {  
        ...state,
        isLoading: true,
        isRequestSent: true
      }
    }
    case GET_PASSWORD_SUCCESS: {
      return {  
        ...state,
        success: action.res.success,
        isLoading: false,
        emailRecoverSuccess: true
      }
    }
    case RECOVER_PASSWORD_CLEAN: {
      return {  
        ...state,
        emailRecoverSuccess: false
      }
    }
    case GET_PASSWORD_FAILED: {
      return {  
        ...state,
        success: false,
        isLoading: false,
        errorText: action.res.message
      }
    }
    case GET_PASSWORD_CLEAN: {
      return {  
        ...state,
        isLoading: false,
        success: false,
        isRequestSent: false,
        errorText: ''
      }
    }
    default: {
      return state;
    }
  }
}