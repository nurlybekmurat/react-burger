import { GET_PASSWORD_SUCCESS, GET_PASSWORD_REQUEST, GET_PASSWORD_FAILED, GET_PASSWORD_CLEAN, RECOVER_PASSWORD_CLEAN } from './actions';

const initialState = {
  isLoading: false,
  success: false,
  isRequestSent: false,
  emailRecoverSuccess: false, 
  errorText: ''
}

export const recoverPasswordReducer = (state = initialState, action) => {
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
        success: action.payload.success,
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
        errorText: action.payload.message
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