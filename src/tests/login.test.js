import { loginReducer, initialStateLogin } from '../services/login/reducers';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED, CLEAN_LOGIN_INFO } from '../services/login/actions';

describe('Тестирование Логин', () => {
  const loginRes = {
    "success": true,
      "accessToken": "Bearer eyJhbG",
      "refreshToken": "c276",
      "user": {
          "email": "test@test.com",
          "name": "test"
    }
  }

  it('проверка начального состояния', () => {
    expect(loginReducer(undefined, {})).toEqual(initialStateLogin);
  })

  it('проверка запроса', () => {
    const result = loginReducer(initialStateLogin, { type: LOGIN_REQUEST });
    expect(result.isLoading).toEqual(true)
  })
  it('проверка успешного запроса', () => {
    const result = loginReducer(initialStateLogin, { type: LOGIN_SUCCESS, payload: loginRes });
    expect(result.loginData).toEqual(loginRes)
  })
  it('проверка ошибки запроса', () => {
    const result = loginReducer(initialStateLogin, { type: LOGIN_FAILED, payload: 'errorText' });
    expect(result.errorText).toEqual('errorText')
  })
  it('проверка очистки состояния', () => {
    const result = loginReducer(initialStateLogin, { type: CLEAN_LOGIN_INFO });
    expect(result).toEqual({
      loginData: undefined,
      isLoading: false,
      errorText: '',
    })
  })
})
