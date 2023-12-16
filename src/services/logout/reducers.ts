import { deleteCookie } from "../../utils/utils";
import { LOG_OUT_REQUEST, LOG_OUT_FAILED, LOG_OUT_SUCCESS, TLogoutActions } from "./actions";

type TLogoutState = {
  logOutRequest: boolean,
  logOutFailed: boolean,
}


export const initialStateLogout: TLogoutState = {
  logOutRequest: false,
  logOutFailed: false,
}

export const logOutReduser = (state: TLogoutState = initialStateLogout, action: TLogoutActions): TLogoutState => {
  switch (action.type) {
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        logOutRequest: true,
        logOutFailed: false,
      }
    }
    case LOG_OUT_SUCCESS: {
      deleteCookie('token');
      deleteCookie('refreshToken');
      return {
        ...state,
        logOutRequest: false,
      }
    }
    case LOG_OUT_FAILED: {
      return {
        ...state,
        logOutRequest: false,
        logOutFailed: true,
      }
    }
    default: {
      return state
    }
  }
}