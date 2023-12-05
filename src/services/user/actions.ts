import { fetchWithRefresh } from "../../utils/utils";
import { API_URL } from "../../constants/constants";
import { AppDispatch, AppThunk } from "../store";
import { TUserInfo } from "../../utils/types";

export const REFRESH_USER_INFO_REQUEST: "REFRESH_USER_INFO_REQUEST" = "REFRESH_USER_INFO_REQUEST";
export const REFRESH_USER_INFO_SUCCESS: "REFRESH_USER_INFO_SUCCESS" = "REFRESH_USER_INFO_SUCCESS";
export const REFRESH_USER_INFO_FAILED: "REFRESH_USER_INFO_FAILED" = "REFRESH_USER_INFO_FAILED";
export const GET_USER_INFO_REQUEST: "GET_USER_INFO_REQUEST" = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_SUCCESS: "GET_USER_INFO_SUCCESS" = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED: "GET_USER_INFO_FAILED" = "GET_USER_INFO_FAILED";
export const CLEAN_USER_INFO: "CLEAN_USER_INFO" = "CLEAN_USER_INFO";

export interface IRefreshUserRequest {
  readonly type: typeof REFRESH_USER_INFO_REQUEST
}

export interface IRefreshUserSuccess {
  readonly type: typeof REFRESH_USER_INFO_SUCCESS,
  payload: TUserInfo
}

export interface IRefreshUserFailed {
  readonly type: typeof REFRESH_USER_INFO_FAILED,
}

export interface IGetUserInfoRequest {
  readonly type: typeof GET_USER_INFO_REQUEST
}

export interface IGetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_SUCCESS,
  payload: TUserInfo
}

export interface IGetUserInfoFailed {
  readonly type: typeof GET_USER_INFO_FAILED,
}

export interface ICleanUserInfo {
  readonly type: typeof CLEAN_USER_INFO,
}

export type TUserActions = 
| IRefreshUserRequest
| IRefreshUserSuccess
| IRefreshUserFailed
| IGetUserInfoRequest
| IGetUserInfoSuccess
| IGetUserInfoFailed
| ICleanUserInfo


export interface ICleanUserInfo {
  readonly type: typeof CLEAN_USER_INFO
}
export const refreshUserInfo: AppThunk = (userName: string, email: string, pass: string, token: string) => {
  return function (dispatch: AppDispatch) {
  dispatch({
    type: REFRESH_USER_INFO_REQUEST,
  })
  fetchWithRefresh(`${API_URL}auth/user`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      "email": email,
      "password": pass,
      "name": userName
    })
  })
  .then(res => {
    if (res) {
      dispatch({
        type: REFRESH_USER_INFO_SUCCESS,
        res: res
      })
    }
  })
  .catch(err => {
    console.log(err)
    dispatch({
      type: REFRESH_USER_INFO_FAILED
    })
  })
  }
}

export const getUserInfo: AppThunk = (token: string) => {
  return function (dispatch: AppDispatch) {
  dispatch({
    type: GET_USER_INFO_REQUEST
  })
  fetchWithRefresh(`${API_URL}auth/user`, {
    method: "GET",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
  .then(res => {
    if (res) {
      dispatch({
        type: GET_USER_INFO_SUCCESS,
        res: res
      })
    }
  })
  .catch((err) => {
      dispatch({
        type: GET_USER_INFO_FAILED
      })
    }
  )
  }
}

export const cleanUserInfo = () => {
  return {
    type: CLEAN_USER_INFO
  }
}