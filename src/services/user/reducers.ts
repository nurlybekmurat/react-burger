import { 
  REFRESH_USER_INFO_REQUEST, REFRESH_USER_INFO_FAILED, REFRESH_USER_INFO_SUCCESS,
  CLEAN_USER_INFO, GET_USER_INFO_REQUEST, GET_USER_INFO_FAILED, GET_USER_INFO_SUCCESS
} from "./actions";

export type TUserState = {
  userRefreshRequest: boolean,
  userRefreshFailed: boolean,
  userInfoRequest: boolean,
  authChecked: boolean,
  userInfoFailed: boolean,
  userName: string,
  userEmail: string
}

const initialState = {
  userRefreshRequest: false,
  userRefreshFailed: false,
  userInfoRequest: false,
  authChecked: false,
  userInfoFailed: false,
  userName: '',
  userEmail: ''
}

export const userReduser = (state: TUserState = initialState, action: any): TUserState => {
  switch (action.type) {
    case REFRESH_USER_INFO_REQUEST: {
      return {
        ...state,
        userRefreshRequest: true,
        userRefreshFailed: false
      }
    }
    case REFRESH_USER_INFO_SUCCESS: {
      return {
        ...state,
        userRefreshRequest: false,
        userName: action.res.user.name,
        userEmail: action.res.user.email
      }
    }
    case REFRESH_USER_INFO_FAILED: {
      return {
        ...state,
        userRefreshRequest: false,
        userRefreshFailed: true
      }
    }
    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
        userInfoRequest: true,
        userInfoFailed: false
      }
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfoRequest: false,
        authChecked: true,
        userName: action.res.user.name,
        userEmail: action.res.user.email
      }
    }
    case GET_USER_INFO_FAILED: {
      return {
        ...state,
        userInfoRequest: false,
        authChecked: true,
        userInfoFailed: true,
      }
    }
    case CLEAN_USER_INFO: {
      return {
        userInfoRequest: false,
        authChecked: false,
        userInfoFailed: false,
        userRefreshRequest: false,
        userRefreshFailed: false,
        userName: '',
        userEmail: ''
      }
    }
    default: {
        return state
    }
  }
}