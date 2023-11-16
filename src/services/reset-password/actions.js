import { request } from '../../utils/utils';

export const PASSWORD_RESET_REQUEST = "PASSWORD_RESET_REQUEST";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_FAILED = "PASSWORD_RESET_FAILED";
export const PASSWORD_RESET_CLEAN_STATE = "PASSWORD_RESET_CLEAN_STATE";

const resetPasswordHelper = async (pass, token) => {
  return await request('password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "password": pass,
      "token": token
    })
  });
}

export const resetPassword = (pass, token) => (dispatch) => {
  dispatch({ type: PASSWORD_RESET_REQUEST })
  resetPasswordHelper(pass, token)
  .then((data) => { 
    console.log(data);
    dispatch({ type: PASSWORD_RESET_SUCCESS, payload: data }); 
  })
  .then(() => { dispatch({ type: PASSWORD_RESET_CLEAN_STATE }) })
  .catch((err)=> { dispatch({ type: PASSWORD_RESET_FAILED, payload: err.message})});
}