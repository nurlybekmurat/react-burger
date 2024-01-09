import { PASSWORD_RESET_REQUEST, PASSWORD_RESET_CLEAN_STATE, PASSWORD_RESET_FAILED, PASSWORD_RESET_SUCCESS } from "./actions";

type TResetPasswordState = {
  passwordResetRequest: boolean,
  passwordResetFailed: boolean,
  response?: {
    success: boolean
  } | null
}

const initialStateResetPass: TResetPasswordState = {
  passwordResetRequest: false,
  passwordResetFailed: false,
  response: null
}

export const passwordResetReduser = (state: TResetPasswordState = initialStateResetPass, action: any): TResetPasswordState => {
  switch (action.type) {
    case PASSWORD_RESET_REQUEST: {
      return {
        ...state,
        passwordResetRequest: true,
        passwordResetFailed: false
      }
    }
    case PASSWORD_RESET_SUCCESS: {
      return {
        ...state,
        passwordResetRequest: false,
        response: action.payload
      }
    }
    case PASSWORD_RESET_FAILED: {
      return {
        ...state,
        passwordResetRequest: false,
        passwordResetFailed: true
      }
    }
    case PASSWORD_RESET_CLEAN_STATE: {
      return {
        passwordResetRequest: false,
        passwordResetFailed: false,
        response: null
      }
    }
    default: {
      return state
    }
  }
}