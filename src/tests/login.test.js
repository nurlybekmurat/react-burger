import { loginReducer, initialStateLogin } from '../services/login/reducers';
import { login, cleanLoginInfo } from '../services/login/actions';

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

  it('успешно прошел запрос', () => {
    const result = loginReducer(initialStateLogin, login());
    result.loginData = {
      ...loginRes
    }
    expect(result.loginData)
      .toEqual(loginRes)
  })
  it('Очистка состояние логина', () => {
    expect(loginReducer(initialStateLogin, cleanLoginInfo()))
      .toEqual({
        loginData: undefined,
        isLoading: false,
        errorText: '',
      })
  })
})