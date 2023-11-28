import { CLEAN_USER_INFO } from "../user/actions";
import { CLEAN_LOGIN_INFO } from "../login/actions";
import { request } from '../../utils/utils';
import { AppDispatch, AppThunk } from "../store";

export const LOG_OUT_REQUEST: "LOG_OUT_REQUEST" = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS: "LOG_OUT_SUCCESS" = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILED: "LOG_OUT_FAILED" = "LOG_OUT_FAILED";

export const logOut: AppThunk = (token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOG_OUT_REQUEST
    })
    request('auth/logout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "token": token,
      })
    }).then((data)=> {
      if (data) {
        dispatch({ type: LOG_OUT_SUCCESS })
        dispatch({ type: CLEAN_LOGIN_INFO })
        dispatch({ type: CLEAN_USER_INFO })
      }
    }).catch((error)=> {
      dispatch({ type: LOG_OUT_FAILED, })
      dispatch({ type: LOG_OUT_FAILED })
    })
  }
}
