import { deleteCookie } from "../../utils/utils";
import { LOG_OUT_REQUEST, LOG_OUT_FAILED, LOG_OUT_SUCCESS } from "./actions";

const initialState = {
    logOutRequest: false,
    logOutFailed: false,
}

export const logOutReduser = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        logOutRequest: true,
        logOutFailed: false
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
      deleteCookie('token');
      deleteCookie('refreshToken');
      return {
        ...state,
        logOutRequest: false,
        logOutFailed: true
      }
    }
    default: {
      return state
    }
  }
}