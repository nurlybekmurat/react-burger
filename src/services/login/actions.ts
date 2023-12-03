import { TUserLogin } from '../../utils/types';
import { request } from '../../utils/utils';
import { AppDispatch, AppThunk } from '../store';

export const LOGIN_REQUEST: 'LOGINS_REQUEST' = 'LOGINS_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const CLEAN_LOGIN_INFO: 'CLEAN_LOGIN_INFO' = 'CLEAN_LOGIN_INFO';

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS,
  payload: TUserLogin
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED,
  payload: string
}

export interface ICleanLoginInfo {
  readonly type: typeof CLEAN_LOGIN_INFO,
}

export type TLoginActions = 
| ILoginRequest
| ILoginSuccess
| ILoginFailed
| ICleanLoginInfo

export const login: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN_REQUEST });
    request('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'email': email,
        'password': password,
      })
    }).then((data) => {
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    })
    .catch((err)=> { dispatch({ type: LOGIN_FAILED, payload: err.message})})
  }
}

export const cleanLoginInfo = () => {
  return {
    type: CLEAN_LOGIN_INFO
  }
}