import { loginUser, setCookie } from '../../utils/utils';

export const LOGIN_REQUEST = 'LOGINS_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const CLEAN_LOGIN_INFO = 'CLEAN_LOGIN_INFO';

export const login = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  loginUser(email, password).then(data => {
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    setCookie('token', data.accessToken);
    setCookie('refreshToken', data.refreshToken);
  })
  .catch((err)=> { dispatch({ type: LOGIN_FAILED, payload: err.message})})
}

export const cleanLoginInfo = () => {
  return {
    type: CLEAN_LOGIN_INFO
  }
}