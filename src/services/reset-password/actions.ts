import { request } from '../../utils/utils';
import { AppDispatch, AppThunk } from '../store';

export const PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED";
export const PASSWORD_RESET_CLEAN_STATE = "PASSWORD_RESET_CLEAN_STATE";

export const resetPassword: AppThunk = (pass: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: PASSWORD_RESET_REQUEST })
    request('password-reset/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "password": pass,
        "token": token
      })
    })
    .then((data) => { 
      dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data }); 
    })
    .then(() => { dispatch({ type: PASSWORD_RESET_CLEAN_STATE }) })
    .catch((err)=> { dispatch({ type: PASSWORD_RESET_FAILED, payload: err.message})});
  }
}