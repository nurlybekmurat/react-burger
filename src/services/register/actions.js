import { request } from '../../utils/utils';

export const REGISTER_REQUEST = 'REGISTERS_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

const registerUser = async (name, email, password) => {
  return await request('auth/register', {
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
  });
}

export const register = (name, email, password) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  registerUser(name, email, password).then(data => {
    dispatch({ type: REGISTER_SUCCESS, payload: data })
  })
  .catch((err)=> { dispatch({ type: REGISTER_FAILED, payload: err.message})})
}
