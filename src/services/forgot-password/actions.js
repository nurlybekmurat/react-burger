import { request } from '../../utils/utils';

export const GET_PASSWORD_REQUEST = 'GET_PASSWORD_REQUEST';
export const GET_PASSWORD_SUCCESS = 'GET_PASSWORD_SUCCESS';
export const GET_PASSWORD_FAILED = 'GET_PASSWORD_FAILED';
export const RECOVER_PASSWORD_CLEAN = 'RECOVER_PASSWORD_CLEAN';
export const GET_PASSWORD_CLEAN = 'GET_PASSWORD_CLEAN';


const recoverPasswordHelper = async (email) => {
  return await request('password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email
    })
  });
}

export const recoverPassword = (email) => (dispatch) => {
  dispatch({ type: GET_PASSWORD_REQUEST })
  recoverPasswordHelper(email)
  .then((data) => {
    dispatch({ type: GET_PASSWORD_SUCCESS, payload: data });
  })
  .catch((err)=> { dispatch({ type: GET_PASSWORD_FAILED, payload: err.message})});
}

export const cleanRecoverPassword = () => (dispatch) => {
  dispatch({ type: GET_PASSWORD_CLEAN })
}