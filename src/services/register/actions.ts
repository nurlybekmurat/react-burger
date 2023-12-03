import { TUserLogin } from '../../utils/types';
import { request } from '../../utils/utils';
import { AppDispatch, AppThunk } from '../store';

export const REGISTER_REQUEST: 'REGISTERS_REQUEST' = 'REGISTERS_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST
}

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS,
  payload: TUserLogin
}

export interface IRegisterFailed {
  readonly type: typeof REGISTER_FAILED,
  payload: string
}

export type TRegisterActions = 
| IRegisterRequest
| IRegisterSuccess
| IRegisterFailed

export const register: AppThunk = (name: string, email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: REGISTER_REQUEST });
    request('auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'password': password,
      })
    }).then(data => {
      dispatch({ type: REGISTER_SUCCESS, payload: data })
    })
    .catch((err)=> { dispatch({ type: REGISTER_FAILED, payload: err.message})})
  }
}
